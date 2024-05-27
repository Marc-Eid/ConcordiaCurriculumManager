import sql from 'mssql';
import { DataType } from './DataType';

export default class Group implements DataType {
  Id: string;
  Name: string;
  Members: string[];
  GroupMasters: string[];
  CreatedDate: Date;
  ModifiedDate: Date;

  constructor(obj: any) {
    this.validateParameter(obj);
    this.Id = obj.Id;
    this.Name = obj.Name;
    this.Members = obj.Members;
    this.GroupMasters = obj.GroupMasters;
    this.CreatedDate = obj.CreatedDate;
    this.ModifiedDate = obj.ModifiedDate;
  }



  async CreateQuery(pool: sql.ConnectionPool): Promise<void> {

    const groupInsertQuery = `INSERT INTO Groups (Id, Name, CreatedDate, ModifiedDate) VALUES (@Id, @Name, @CreatedDate, @ModifiedDate);`;
    const groupUserInsertQuery = `INSERT INTO GroupUser (GroupsId, MembersId) VALUES (@GroupsId, @MembersId);`;
    const groupMastersInsertQuery = `INSERT INTO GroupUser1 (MasteredGroupsId, GroupMastersId) VALUES (@MasteredGroupsId, @GroupMastersId);`;

    const request = pool.request();
    request.input('Id', sql.VarChar, this.Id)
      .input('Name', sql.VarChar, this.Name)
      .input('CreatedDate', sql.DateTime, this.CreatedDate)
      .input('ModifiedDate', sql.DateTime, this.ModifiedDate);

    try {
      await request.query(groupInsertQuery);
    } catch (error) {
      if ((error as sql.RequestError).number !== 2627) {
        throw error;
      }
    }

    const memberRequests = this.Members.map(async (memberId) => {
      const memberRequest = pool.request();
      memberRequest.input('GroupsId', sql.VarChar, this.Id)
        .input('MembersId', sql.VarChar, memberId);

      try {
        await memberRequest.query(groupUserInsertQuery);
      } catch (error) {
        if ((error as sql.RequestError).number !== 2627) {
          throw error;
        }
      }
    });

    const masterRequests = this.GroupMasters.map(async (masterId) => {
      const masterRequest = pool.request();
      masterRequest.input('MasteredGroupsId', sql.VarChar, this.Id)
        .input('GroupMastersId', sql.VarChar, masterId);

      try {
        await masterRequest.query(groupMastersInsertQuery);
      } catch (error) {
        if ((error as sql.RequestError).number !== 2627) {
          throw error;
        }
      }
    });

    await Promise.all([...memberRequests, ...masterRequests]);
  }
    
  private validateParameter(obj: any) {
    if (obj === null || obj === undefined)
      throw new Error('Parameter is not defined.');
    if (typeof obj.Id !== 'string' || obj.Id.trim() === '')
      throw new Error(`Id must be a non-empty string. Passed value is of type ${typeof obj.Id}`);
    if (typeof obj.Name !== 'string' || obj.Name.trim() === '')
      throw new Error(`Name must be a non-empty string. Passed value is of type ${typeof obj.Name}`);
    if (!Array.isArray(obj.Members) || obj.Members.some((i: any) => typeof i !== 'string'))
      throw new Error(`Members must be a string array of User IDs. Passed value is of type ${typeof obj.Members}`);
	if (!Array.isArray(obj.GroupMasters) || obj.GroupMasters.some((i: any) => typeof i !== 'string'))
      throw new Error(`GroupMasters must be a string array of User IDs. Passed value is of type ${typeof obj.GroupMasters}`);
    if (!(obj.CreatedDate instanceof Date))
      throw new Error(`CreatedDate must be a date. Passed value is of type ${typeof obj.CreatedDate}`);
    if (!(obj.ModifiedDate instanceof Date))
      throw new Error(`ModifiedDate must be a date. Passed value is of type ${typeof obj.ModifiedDate}`);
  }
}
