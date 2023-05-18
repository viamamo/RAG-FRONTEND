class MetaField {
  fieldName: string;
  fieldType: string;
  defaultValue: string;
  notNull: boolean;
  comment: string;
  primaryKey: boolean;
  autoIncrement: boolean;
  mockType: string;
  mockParams: string;
}

class MetaTable {
  dbName: string;
  dbType: string;
  tableName: string;
  tableComment: string;
  mockNum: number;
  metaFieldList: MetaField[];
}

class MetaFieldId extends MetaField {
  id: string
}

class MetaTableId {
  id: string;
  dbName: string;
  dbType: string;
  tableName: string;
  tableComment: string;
  mockNum: number;
  metaFieldList: MetaFieldId[];
}

class RouterItem {
  path: string;
  name: string;
  children: RouterItem[];
}

class DictInfo {
  id: number;
  name: string;
  content: string;
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class FieldInfo {
  id: number;
  name: string;
  fieldName: string;
  content: string;
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class TableInfo {
  id: number;
  name: string;
  content: string;
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class UserInfo {
  id: number;
  userName: string;
  userAccount: string;
  userRole: string;
  userPassword: string;
  createTime: Date;
  updateTime: Date;
}

class FieldVO extends MetaFieldId {
  name: string
  fieldName: string;
  fieldType: string;
  defaultValue: string;
  notNull: string;
  comment: string;
  primaryKey: string;
  autoIncrement: string;
  mockType: string;
  mockParams: string;
  updateTime: Date
}

class TableVO extends MetaTableId {
  name:string;
  metaFieldListString:string
  updateTime: Date
}

class GenerationVO {
  metaTable: MetaTable;
  createSql: string;
  dataList: object[];
  insertSql: string;
  dataJson: string;
  javaEntityCode: string;
  javaObjectCode: string;
  typescriptTypeCode: string;
}

class DbInfo {
  id: number;
  name: string;
  dbName:string;
  dbType:string;
  driver:string;
  url:string;
  username:string;
  password:string;
  property:{
    key:string,
    value:string
  }[];
  host:string;
  port:number;
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class JobInfo{
  id:number;
  finishedNum:number;
  mockNum:number;
  status:number;
  dbName:string;
  dbType:string;
  host:string;
  port:number;
  content:string;
  tableName:string;
  exception?:string;
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class JobVO{
  id:number;
  finishedNum:number;
  mockNum:number;
  status:string;
  dbName:string;
  dbType:string;
  host:string;
  port:number;
  tableName:string;
  exception?:string;
  metaFields:MetaField[];
  userId: number;
  createTime: Date;
  updateTime: Date;
}

class DatabaseType{
  key:string;
  name:string;
  defaultPort:number;
}

class FakerType{
  key:string;
  value:string;
}

class FieldType{
  key:string;
  value:string;
}

class MockType{
  key:string;
  value:string;
  mockParamName:string;
}