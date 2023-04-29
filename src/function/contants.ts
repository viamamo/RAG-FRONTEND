export const DEFAULT_USER_ROLE: string = "user"

export const FIELD_TYPES = {
  TINYINT: "tinyint",
  SMALLINT: "smallint",
  MEDIUMINT: "mediumint",
  INT: "int",
  BIGINT: "bigint",
  FLOAT: "float",
  DOUBLE: "double",
  DECIMAL: "decimal",
  DATE: "date",
  TIME: "time",
  YEAR: "year",
  DATETIME: "datetime",
  TIMESTAMP: "timestamp",
  CHAR: "char",
  VARCHAR: "varchar",
  TINYTEXT: "tinytext",
  TEXT: "text",
  MEDIUMTEXT: "mediumtext",
  LONGTEXT: "longtext",
  TINYBLOB: "tinyblob",
  BLOB: "blob",
  MEDIUMBLOB: "mediumblob",
  LONGBLOB: "longblob",
  BINARY: "binary",
  VARBINARY: "varbinary",
}
export const MOCK_TYPES = {
  NONE: "不模拟",
  INCREASE: "递增",
  FIXED: "固定",
  RANDOM: "随机",
  REGEX: "正则",
  DICT: "词库",
}
export const MOCK_LABEL = {
  INCREASE: "起始值",
  FIXED: "固定值",
  RANDOM: "随机规则",
  REGEX: "正则表达式",
  DICT: "词库"
}
export const RANDOM_TYPES = {
  STRING: "字符串",
  NAME: "人名",
  CITY: "城市",
  URL: "网址",
  EMAIL: "邮箱",
  IP: "IP",
  INTEGER: "整数",
  DECIMAL: "小数",
  UNIVERSITY: "大学",
  DATE: "日期",
  TIMESTAMP: "时间戳",
  PHONE: "手机号"
}

export const DATABASE_TYPES:{
  name:string,
  value:string,
  defaultPort:number
}[] = [
  {
    name: "MySql",
    value: "MYSQL",
    defaultPort: 3306,
  },
  {
    name: "PostgreSQL",
    value: "POSTGRES",
    defaultPort: 5432,
  },
  {
    name: "Oracle",
    value: "ORACLE",
    defaultPort: 1521,
  },
  {
    name: "SQLServer",
    value: "SQLSERVER",
    defaultPort: 1433
  },
  {
    name: "Sybase",
    value: "SYBASE",
    defaultPort: 2638
  }
]

export enum metaFieldNames {
  fieldName = "字段名",
  fieldType = "字段类型",
  defaultValue = "默认值",
  notNull = "非空",
  comment = "注释",
  primaryKey = "主键",
  autoIncrement = "自增",
  mockType = "模拟类型",
  mockParams = "模拟参数"
}

