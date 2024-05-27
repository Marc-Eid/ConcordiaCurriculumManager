import sql from 'mssql';
import { DataType } from './DataType';

export default class Role implements DataType {
  Id: string;
  UserRole: number;
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.UserRole = obj.UserRole;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }

  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {
    const roleInsertQuery = `
      INSERT INTO Roles (Id, UserRole, CreatedDate, ModifiedDate)
      VALUES (@Id, @UserRole, @CreatedDate, @ModifiedDate);
  `;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('UserRole', sql.Int, this.UserRole)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(roleInsertQuery);
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
    if (typeof obj.UserRole !== 'number' || isNaN(obj.UserRole))
      throw new Error(`UserRole must be a number. Passed value is of type ${typeof obj.UserRole}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}