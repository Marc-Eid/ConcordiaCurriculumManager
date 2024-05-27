import sql from 'mssql';
import { DataType } from './DataType';

export default class CourseComponents implements DataType {
  Id: string;
  ComponentCode: number;
  ComponentName: string;
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.ComponentCode = obj.ComponentCode;
    this.ComponentName = obj.ComponentName;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }



  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {

    const courseComponentInsertQuery = `INSERT INTO CourseComponents (Id, ComponentCode, ComponentName, CreatedDate, ModifiedDate)
    VALUES (@Id, @ComponentCode, @ComponentName, @CreatedDate, @ModifiedDate);`;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('ComponentCode', sql.Int, this.ComponentCode)
      .input('ComponentName', sql.VarChar, this.ComponentName)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(courseComponentInsertQuery);
    } catch (error) {

      if ((error as sql.RequestError).number !== 2627) {
        throw error;
      }
    }
  }

  private validateParameter(obj: any) {
    if (obj === null || obj === undefined)
      throw new Error('Parameter is not defined.');
    if (typeof obj.Id !== 'string' || obj.Id.trim() === '')
      throw new Error(`Id must be a non-empty string. Passed value is of type ${typeof obj.Id}`);
    if (typeof obj.ComponentCode !== 'number' || isNaN(obj.ComponentCode))
      throw new Error(`ComponentCode must be a number. Passed value is of type ${typeof obj.ComponentCode}`);
    if (typeof obj.ComponentName !== 'string' || obj.ComponentName.trim() === '')
      throw new Error(`ComponentName must be a non-empty string. Passed value is of type ${typeof obj.ComponentName}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}