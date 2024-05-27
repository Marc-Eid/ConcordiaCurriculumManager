import sql, { RequestError } from 'mssql';
import { DataType } from './DataType';
import { CourseCourseComponent } from './CourseCourseComponent';

export default class Course implements DataType {
  Id: string;
  CourseID: string;
  Subject: string;
  Catalog: string;
  Title: string;
  Description: string;
  CourseNotes: string;
  CreditValue: string;
  PreReqs: string;
  Career: number;
  EquivalentCourses: string;
  CourseState: number;
  Version: number;
  Published: boolean;
  CourseCourseComponents: CourseCourseComponent[];
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.CourseID = obj.CourseID;
    this.Subject = obj.Subject;
    this.Catalog = obj.Catalog;
    this.Title = obj.Title;
    this.Description = obj.Description;
    this.CourseNotes = obj.CourseNotes;
    this.CreditValue = obj.CreditValue;
    this.PreReqs = obj.PreReqs;
    this.Career = obj.Career;
    this.EquivalentCourses = obj.EquivalentCourses;
    this.CourseState = obj.CourseState;
    this.Version = obj.Version;
    this.Published = obj.Published;
    this.CourseCourseComponents = obj.CourseCourseComponents;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }

  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {
    const courseInsertQuery = `
      INSERT INTO Courses (Id, CourseID, Subject, Catalog, Title, Description, CourseNotes, CreditValue, PreReqs, Career, EquivalentCourses, CourseState, Version, Published, CreatedDate, ModifiedDate) 
      VALUES (@Id, @CourseID, @Subject, @Catalog, @Title, @Description, @CourseNotes, @CreditValue, @PreReqs, @Career, @EquivalentCourses, @CourseState, @Version, @Published, @CreatedDate, @ModifiedDate);
    `;

    const courseComponentInsertQuery = `
      INSERT INTO CourseCourseComponents (Id, CourseId, ComponentCode, CreatedDate, ModifiedDate) 
      VALUES (@CompId, @CourseId, @ComponentCode, @CreatedDate, @ModifiedDate);
    `;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('CourseID', sql.VarChar, this.CourseID)
      .input('Subject', sql.VarChar, this.Subject)
      .input('Catalog', sql.VarChar, this.Catalog)
      .input('Title', sql.VarChar, this.Title)
      .input('Description', sql.VarChar, this.Description)
      .input('CourseNotes', sql.VarChar, this.CourseNotes)
      .input('CreditValue', sql.VarChar, this.CreditValue)
      .input('PreReqs', sql.VarChar, this.PreReqs)
      .input('Career', sql.Int, this.Career)
      .input('EquivalentCourses', sql.VarChar, this.EquivalentCourses)
      .input('CourseState', sql.Int, this.CourseState)
      .input('Version', sql.Int, this.Version)
      .input('Published', sql.Bit, this.Published)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(courseInsertQuery);
    } catch (error) {
      if ((error as sql.RequestError).number !== 2627) {
        throw error;
      }
    }

    const componentRequests = this.CourseCourseComponents.map(c => {
      const componentRequest = pool.request();
      componentRequest.input('CompId', sql.VarChar, c.Id)
        .input('CourseId', sql.VarChar, this.Id)
        .input('ComponentCode', sql.Int, c.ComponentCode)
        .input('CreatedDate', sql.DateTime, this.CreatedDate)
        .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

      return componentRequest.query(courseComponentInsertQuery)
        .catch((error) => {
          if ((error as sql.RequestError).number !== 2627) {
            throw error;
          }
        });
    });

    await Promise.all(componentRequests);
  }



  private validateParameter(obj: any) {
    if (obj === null || obj === undefined)
      throw new Error('Parameter is not defined.');
    if (typeof obj.Id !== 'string' || obj.Id.trim() === '')
      throw new Error(`Id must be a non-empty string. Passed value is of type ${typeof obj.Id}`);
    if (typeof obj.CourseID !== 'string' || obj.CourseID.trim() === '')
      throw new Error(`CourseID must be a non-empty string. Passed value is of type ${typeof obj.CourseID}`);
    if (typeof obj.Subject !== 'string' || obj.Subject.trim() === '')
      throw new Error(`Subject must be a non-empty string. Passed value is of type ${typeof obj.Subject}`);
    if (typeof obj.Catalog !== 'string' || obj.Catalog.trim() === '')
      throw new Error(`Catalog must be a non-empty string. Passed value is of type ${typeof obj.Catalog}`);
    if (typeof obj.Title !== 'string' || obj.Title.trim() === '')
      throw new Error(`Title must be a non-empty string. Passed value is of type ${typeof obj.Title}`);
    if (typeof obj.Description !== 'string')
      throw new Error(`Description must be a string. Passed value is of type ${typeof obj.Description}`);
    if (typeof obj.CourseNotes !== 'string')
      throw new Error(`CourseNotes must be a string. Passed value is of type ${typeof obj.CourseNotes}`);
    if (typeof obj.CreditValue !== 'string' || obj.CreditValue.trim() === '')
      throw new Error(`CreditValue must be a non-empty string. Passed value is of type ${typeof obj.CreditValue}`);
    if (typeof obj.PreReqs !== 'string')
      throw new Error(`PreReqs must be a string. Passed value is of type ${typeof obj.PreReqs}`);
    if (typeof obj.Career !== 'number' || isNaN(obj.Career))
      throw new Error(`Career must be a number. Passed value is of type ${typeof obj.Career}`);
    if (typeof obj.EquivalentCourses !== 'string')
      throw new Error(`EquivalentCourses must be a string. Passed value is of type ${typeof obj.EquivalentCourses}`);
    if (typeof obj.CourseState !== 'number' || isNaN(obj.CourseState))
      throw new Error(`CourseState must be a number. Passed value is of type ${typeof obj.CourseState}`);
    if (typeof obj.Version !== 'number' || isNaN(obj.Version))
      throw new Error(`Version must be a number. Passed value is of type ${typeof obj.Version}`);
    if (typeof obj.Published !== 'boolean')
      throw new Error(`Published must be a boolean. Passed value is of type ${typeof obj.Published}`);
    if (!Array.isArray(obj.CourseCourseComponents) || obj.CourseCourseComponents.some((c: any) => (typeof c.Id !== 'string' || c.Id.trim() === '')))
      throw new Error(`CourseCourseComponents must be an array of CourseCourseComponent. Passed value is of type ${typeof obj.CourseCourseComponent}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}