import {nanoid} from "nanoid";
import {useClipboard} from "@vueuse/core";
import {ElMessage} from "element-plus";

export async function requestGet(url: string, params:[string,any][]): Promise<GenericResponse<any>> {
  let mark=true;
  for(let [key,value] of params){
    if(value!==undefined){
      if(mark){
        url+=`?${key}=${value}`
        mark=false
      }
      else{
        url+=`&${key}=${value}`
      }
    }
  }
  return fetch(import.meta.env.VITE_API_BASE_URL + url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(data => {
      return data.json();
    })
}

export async function requestPost(url: string, data: any):Promise<GenericResponse<any>> {
  return fetch(import.meta.env.VITE_API_BASE_URL + url, {
    method: 'Post',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(data => {
      return data.json();
    })
}

export async function requestPostBlob(url: string, data: any):Promise<Blob> {
  return fetch(import.meta.env.VITE_API_BASE_URL + url, {
    method: 'Post',
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(data => {
      return data.blob();
    })
}


export async function requestTableData<T>(url:string,params:GenericGetRequest):Promise<GenericResponse<Page<T>>>
{
  let paramList=Object.entries(params)
  return requestGet(url,paramList).then((data)=>{
    return data;
  })
}

export function dateFormat(date:Date):string{
  return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`
}

export function dateStringFormat(dateString:string):string{
  let date=new Date(dateString)
  return dateFormat(date)
}

export function MetaTable2MetaTableId(metaTable:MetaTable):MetaTableId{
  return {
    id: nanoid(),
    dbName: metaTable.dbName,
    dbType: metaTable.dbType,
    tableName: metaTable.tableName,
    tableComment: metaTable.tableComment,
    mockNum: metaTable.mockNum,
    metaFieldList: metaTable.metaFieldList.map((value) => {
      return MetaField2MetaFieldId(value)
    })
  }
}

export function MetaTableId2MetaTable(metaTableId:MetaTableId):MetaTable{
  return {
    dbName: metaTableId.dbName,
    dbType: metaTableId.dbType,
    tableName: metaTableId.tableName,
    tableComment: metaTableId.tableComment,
    mockNum: metaTableId.mockNum,
    metaFieldList: metaTableId.metaFieldList.map((value) => {
      return MetaFieldId2MetaField(value)
    })
  }
}

export function MetaField2MetaFieldId(metaField:MetaField):MetaFieldId{
  return {
    id:nanoid(),
    fieldName: metaField.fieldName,
    fieldType: metaField.fieldType,
    defaultValue: metaField.defaultValue,
    notNull: metaField.notNull,
    comment: metaField.comment,
    primaryKey: metaField.primaryKey,
    autoIncrement: metaField.autoIncrement,
    mockType: metaField.mockType,
    mockParams: metaField.mockParams
  }
}

export function MetaFieldId2MetaField(metaFieldId:MetaFieldId):MetaField{
  return {
    fieldName: metaFieldId.fieldName,
    fieldType: metaFieldId.fieldType,
    defaultValue: metaFieldId.defaultValue,
    notNull: metaFieldId.notNull,
    comment: metaFieldId.comment,
    primaryKey: metaFieldId.primaryKey,
    autoIncrement: metaFieldId.autoIncrement,
    mockType: metaFieldId.mockType,
    mockParams: metaFieldId.mockParams
  }
}

export function copy2ClipBoard(value:string):void{
  const { copy, isSupported } = useClipboard();
  if (!isSupported) {
    ElMessage.info({
      message:`您的浏览器不支持Clipboard API，请手动复制：\n${value}`,
      showClose:true,
      duration:0
    })
    return;
  }
  if(window.isSecureContext) {
    copy(value);
    ElMessage.success("已复制到剪切板")
  }
  else {
    let textArea = document.createElement("textarea");
    textArea.value = value;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = "0";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy') ?
      ElMessage.success("已复制到剪切板") :
      ElMessage.info({
        message: `您的浏览器不支持Clipboard API，请手动复制：\n${value}`,
        showClose: true,
        duration: 0
      }) ;
    textArea.remove();
  }
}