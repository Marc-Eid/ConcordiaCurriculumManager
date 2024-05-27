import sql from 'mssql';
import { DataType } from './DataType';

type CourseGroupingReference = {
    Id: string
    ChildGroupCommonIdentifier: string
    GroupingType: number
}

type CourseGroupingCourseIdentifier = {
    CourseGroupingId: string
    CourseIdentifiersId: string
}

export default class CourseGrouping implements DataType {
  Id: string;
  CommonIdentifier: string;
  Name: string;
  RequiredCredits: string;
  IsTopLevel: boolean;
  School: number;
  Description: string;
  Notes: string;
  State: number;
  Version: number;
  Published: boolean;
  CourseGroupingReferences: CourseGroupingReference[];
  CourseGroupingCourseIdentifier: CourseGroupingCourseIdentifier[];
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.CommonIdentifier = obj.CommonIdentifier;
    this.Name = obj.Name;
    this.RequiredCredits = obj.RequiredCredits;
    this.IsTopLevel = obj.IsTopLevel;
    this.School = obj.School;
    this.Description = obj.Description;
    this.Notes = obj.Notes;
    this.State = obj.State;
    this.Version = obj.Version;
    this.Published = obj.Published;
    this.CourseGroupingReferences = obj.CourseGroupingReferences;
    this.CourseGroupingCourseIdentifier = obj.CourseGroupingCourseIdentifier;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }


async CreateQuery(pool: sql.ConnectionPool): Promise<void> {

  const courseGroupingInsertQuery = `
    INSERT INTO CourseGroupings (Id, CommonIdentifier, Name, RequiredCredits, IsTopLevel, School, Description, Notes, State, Version, Published, CreatedDate, ModifiedDate)
    VALUES (@Id, @CommonIdentifier, @Name, @RequiredCredits, @IsTopLevel, @School, @Description, @Notes, @State, @Version, @Published, @CreatedDate, @ModifiedDate);`;

const courseGroupingReferenceInsertQuery = `
    INSERT INTO CourseGroupingReferences (Id, ParentGroupId, ChildGroupCommonIdentifier, CreatedDate, ModifiedDate, GroupingType)
    VALUES (@RefId, @ParentGroupId, @ChildGroupCommonIdentifier, @CreatedDate, @ModifiedDate, @GroupingType);`;

const courseGroupingCourseIdentifierInsertQuery = `
    INSERT INTO CourseGroupingCourseIdentifier (CourseGroupingId, CourseIdentifiersId)
    VALUES (@CourseGroupingId, @CourseIdentifiersId);`;

  const request = pool.request();
  request.input('Id', sql.VarChar, this.Id)
    .input('CommonIdentifier', sql.VarChar, this.CommonIdentifier)
    .input('Name', sql.VarChar, this.Name)
    .input('RequiredCredits', sql.VarChar, this.RequiredCredits)
    .input('IsTopLevel', sql.Bit, this.IsTopLevel)
    .input('School', sql.Int, this.School)
    .input('Description', sql.VarChar, this.Description)
    .input('Notes', sql.VarChar, this.Notes)
    .input('State', sql.Int, this.State)
    .input('Version', sql.Int, this.Version)
    .input('Published', sql.Bit, this.Published)
    .input('CreatedDate', sql.DateTime, this.CreatedDate)
    .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

  try {
    await request.query(courseGroupingInsertQuery);
  } catch (error) {
    if ((error as sql.RequestError).number !== 2627) {
      throw error;
    }
  }

  const referenceRequests = this.CourseGroupingReferences.map(async (c) => {
    const referenceRequest = pool.request();
    referenceRequest.input('RefId', sql.VarChar, c.Id)
      .input('ParentGroupId', sql.VarChar, this.Id)
      .input('ChildGroupCommonIdentifier', sql.VarChar, c.ChildGroupCommonIdentifier)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate)
      .input('GroupingType', sql.Int, c.GroupingType);

    try {
      await referenceRequest.query(courseGroupingReferenceInsertQuery);
    } catch (error) {
      if ((error as sql.RequestError).number !== 2627) {
        throw error;
      }
    }
  });

  const courseIdentifierRequests = this.CourseGroupingCourseIdentifier.map(async (c) => {
    const courseIdentifierRequest = pool.request();
    courseIdentifierRequest.input('CourseGroupingId', sql.VarChar, c.CourseGroupingId)
      .input('CourseIdentifiersId', sql.VarChar, c.CourseIdentifiersId);

    try {
      await courseIdentifierRequest.query(courseGroupingCourseIdentifierInsertQuery);
    } catch (error) {
      if ((error as sql.RequestError).number !== 2627) {
        throw error;
      }
    }
  });

  await Promise.all([...referenceRequests, ...courseIdentifierRequests]);
}


  private validateParameter(obj: any) {
    if (obj === null || obj === undefined)
      throw new Error('Parameter is not defined.');
    if (typeof obj.Id !== 'string' || obj.Id.trim() === '')
      throw new Error(`Id must be a non-empty string. Passed value is of type ${typeof obj.Id}`);
    if (typeof obj.CommonIdentifier !== 'string' || obj.CommonIdentifier.trim() === '')
      throw new Error(`CommonIdentifier must be a non-empty string. Passed value is of type ${typeof obj.CommonIdentifier}`);
    if (typeof obj.Name !== 'string' || obj.Name.trim() === '')
      throw new Error(`Name must be a non-empty string. Passed value is of type ${typeof obj.Name}`);
    if (typeof obj.RequiredCredits !== 'string' || obj.RequiredCredits.trim() === '')
      throw new Error(`RequiredCredits must be a non-empty string. Passed value is of type ${typeof obj.RequiredCredits}`);
    if (typeof obj.IsTopLevel !== 'boolean')
      throw new Error(`IsTopLevel must be a boolean. Passed value is of type ${typeof obj.IsTopLevel}`);
    if (typeof obj.School !== 'number')
      throw new Error(`School must be a number. Passed value is of type ${typeof obj.School}`);
    if (typeof obj.Description !== 'string')
      throw new Error(`Description must be a string. Passed value is of type ${typeof obj.Description}`);
    if (typeof obj.Notes !== 'string')
      throw new Error(`Notes must be a string. Passed value is of type ${typeof obj.Notes}`);
    if (typeof obj.State !== 'number' || isNaN(obj.State))
      throw new Error(`State must be a number. Passed value is of type ${typeof obj.State}`);
    if (typeof obj.Version !== 'number' || isNaN(obj.Version))
      throw new Error(`Version must be a number. Passed value is of type ${typeof obj.Version}`);
    if (typeof obj.Published !== 'boolean')
      throw new Error(`Published must be a boolean. Passed value is of type ${typeof obj.Published}`);
    if (!Array.isArray(obj.CourseGroupingReferences) || obj.CourseGroupingReferences.some((c: any) => (typeof c.Id !== 'string' || c.Id.trim() === '')))
      throw new Error(`CourseGroupingReferences must be an array of CourseGroupingReference. Passed value is of type ${typeof obj.CourseGroupingReferences}`);
    if (!Array.isArray(obj.CourseGroupingCourseIdentifier) || obj.CourseGroupingCourseIdentifier.some((c: any) => (typeof c.CourseGroupingId !== 'string' || c.CourseGroupingId.trim() === '')))
      throw new Error(`CourseGroupingCourseIdentifier must be an array of CourseGroupingCourseIdentifier. Passed value is of type ${typeof obj.CourseGroupingCourseIdentifier}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}