import sql from 'mssql';
import { DataType } from './DataType';

export default class CourseIdentifier implements DataType {
  Id: string;
  ConcordiaCourseId: string;
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.ConcordiaCourseId = obj.ConcordiaCourseId;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }


  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {
    const courseIdentifierInsertQuery = `
      INSERT INTO CourseIdentifiers (Id, ConcordiaCourseId, CreatedDate, ModifiedDate)
      VALUES (@Id, @ConcordiaCourseId, @CreatedDate, @ModifiedDate);`;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('ConcordiaCourseId', sql.VarChar, this.ConcordiaCourseId)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(courseIdentifierInsertQuery);
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
    if (typeof obj.ConcordiaCourseId !== 'string' || obj.ConcordiaCourseId.trim() === '')
      throw new Error(`ConcordiaCourseId must be a non-empty string. Passed value is of type ${typeof obj.ConcordiaCourseId}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}