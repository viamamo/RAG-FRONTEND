/**
 * 分页信息
 */
class Page<T> {
  current: number;
  size: number;
  total: number;
  records: T[];
}

/**
 * response封装
 */
class GenericResponse<T> {
  code!: number;
  data: T;
  message!: string;
}

/**
 * get封装
 */
class GenericGetRequest {
  sortOrder?:string;
  sortColumn?:string;
  paginationNum?:number;
  paginationSize?:number;
  searchParam?:string
}
