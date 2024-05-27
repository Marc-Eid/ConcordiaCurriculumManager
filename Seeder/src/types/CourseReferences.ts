import sql from 'mssql';
import { DataType } from './DataType';

export default class CourseReference implements DataType {
  Id: string;
  CourseReferencingId: string;
  CourseReferencedId: string;
  State: number;
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.CourseReferencingId = obj.CourseReferencingId;
    this.CourseReferencedId = obj.CourseReferencedId;
    this.State = obj.State;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }

  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {
    const courseReferenceInsertQuery = `
      INSERT INTO CourseReferences (Id, CourseReferencingId, CourseReferencedId, State, CreatedDate, ModifiedDate)
      VALUES (@Id, @CourseReferencingId, @CourseReferencedId, @State, @CreatedDate, @ModifiedDate);
  `;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('CourseReferencingId', sql.VarChar, this.CourseReferencingId)
      .input('CourseReferencedId', sql.VarChar, this.CourseReferencedId)
      .input('State', sql.Int, this.State)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(courseReferenceInsertQuery);
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
    if (typeof obj.CourseReferencingId !== 'string' || obj.CourseReferencingId.trim() === '')
      throw new Error(`CourseReferencingId must be a non-empty string. Passed value is of type ${typeof obj.CourseReferencingId}`);
    if (typeof obj.CourseReferencedId !== 'string' || obj.CourseReferencedId.trim() === '')
      throw new Error(`CourseReferencedId must be a non-empty string. Passed value is of type ${typeof obj.CourseReferencedId}`);
    if (typeof obj.State !== 'number' || isNaN(obj.State))
      throw new Error(`State must be a number. Passed value is of type ${typeof obj.State}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}