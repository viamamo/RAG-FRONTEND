import {defineStore} from "pinia";
import {nanoid} from "nanoid";


export const useMetaTableStore=defineStore('metaTableId',{
  state:()=>{
    return{
      metaTableId:{
        id:nanoid(),
        dbName: "",
        dbType: "",
        tableName: "",
        tableComment: "",
        mockNum: 0,
        metaFieldList: []
      } as MetaTableId,
    }
  }
})

export const useUserDialogVisibleStore = defineStore('userDialogVisible',{
  state:()=>{
    return {
      loginDialogVisible:false
    }
  }
})

export const useImportDialogVisibleStore = defineStore('importDialogVisible',{
  state:()=>{
    return {
      autoImportDialogVisible:false,
      tableImportDrawerVisible:false,
      configImportDialogVisible:false,
      sqlImportDialogVisible:false,
      excelImportDialogVisible:false,
      fieldImportDrawerVisible:false
    }
  }
})

export const useAddDialogVisibleStore = defineStore('addDialogVisible',{
  state:()=>{
    return {
      addDictDialogVisible:false,
      addDatabaseDialogVisible:false
    }
  }
})

export const useUserInformationStore = defineStore('userInformation',{
  state:()=>{
    return {
      isLogin:false,
      id:-1,
      userName:"",
      userAccount:"",
      userRole:"",
      userPassword:"",
      createTime:{},
      updateTime:{},
    }
  }
})
// 不合并
export const useGeneratedResultsStore = defineStore('generatedResults',{
  state:()=>{
    return {
      generationVO:{} as GenerationVO
    }
  }
})

export const useExecuteDialogVisibleStore = defineStore('executeDialogVisible',{
  state:()=>{
    return{
      executeSqlDialogVisible:false,
      executeSimpleSqlDialog:false,
      addJobDialogVisible:false
    }
  }
})

export const useLoadingStore = defineStore('loading',{
  state:()=>{
    return{
      generateLoading:false
    }
  }
})

export const useDictStore = defineStore('dict',{
  state:()=>{
    return {
      dictInfoList: [] as DictInfo[],
    }
  }
})

export const useBasicInfoStore=defineStore('basicInfo',{
  state:()=>{
    return {
      DATABASE_TYPES:[] as DatabaseType[],
      FAKER_TYPES:[] as FakerType[],
      FIELD_TYPES:[] as FieldType[],
      MOCK_TYPES:[] as MockType[],
    }
  },
  actions:{
    getDatabaseType(key:string):DatabaseType|undefined{
      let databaseType=this.DATABASE_TYPES.find((value)=>{
        if(value.key===key){
          return value
        }
      })
      if(databaseType==undefined){
        return undefined
      }
      return {key: databaseType.key, name: databaseType.name ,defaultPort:databaseType.defaultPort}
    },
    getMockType(key:string):MockType|undefined{
      let mockType=this.MOCK_TYPES.find((value)=>{
        if(value.key===key){
          return value
        }
      })
      if(mockType==undefined){
        return undefined
      }
      return {key: mockType.key, mockParamName: mockType.mockParamName, value: mockType.value}
    }
  }
})