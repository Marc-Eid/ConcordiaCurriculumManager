import fs from 'fs';
import sql, { RequestError } from 'mssql';
import { DataType, JsonData } from './types/DataType';

export const readFile = <T extends DataType>(path: string, constructor: new (arg: any) => T) => {
  const jsonContent = fs.readFileSync(path, 'utf-8');
  const jsonData: JsonData<T> = JSON.parse(jsonContent);

  if (jsonData.TableName === undefined
    || jsonData.AutoGenerateCreatedDate === undefined
    || jsonData.AutoGenerateModifiedDate === undefined
    || jsonData.Data === undefined
    || !Array.isArray(jsonData.Data)) {
    throw new Error(`JSON file [${path}] is not valid`)
  }

  const data: T[] = jsonData.Data.map(item => {
    if (!item.CreatedDate && jsonData.AutoGenerateCreatedDate) {
      item.CreatedDate = new Date();
    }

    if (!item.ModifiedDate && jsonData.AutoGenerateModifiedDate) {
      item.ModifiedDate = new Date();
    }

    return new constructor(item);
  });

  jsonData.Data = data;
  return jsonData;
}

const seedTable = async <T extends DataType>(pool: sql.ConnectionPool, json: JsonData<T>) => {
  try {
    for (const item of json.Data) {
        await item.CreateQuery(pool);
    }
    console.log(`${json.TableName} table(s) was/were seeded successfully!`);
  } catch (error) {
    if ((error as RequestError).number !== 2627 ){
      console.error(`Error while seeding ${json.TableName} table:`, error);
      throw error;  
    }
  }
};


export const seedDataBase = async (jsonDataArray: JsonData<DataType>[]) => {
  const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER || 'localhost',
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  let pool: sql.ConnectionPool | null = null;

  try {
    pool = await sql.connect(sqlConfig);

    for (const jsonData of jsonDataArray) {
      await seedTable(pool, jsonData);
    }
  } catch (error) {
    console.error('Error while seeding the database:', error);
    throw error;
  } finally {
    // if (pool?.connected) {
    //   await pool.close();
    // }
  }
}
