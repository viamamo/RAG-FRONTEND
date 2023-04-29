import {defineStore} from "pinia";
import {nanoid} from "nanoid";


export const useMetaTableStore=defineStore('metaTableId',{
  state:()=>{
    return{
      metaTableId:{
        id:nanoid(),
        dbName: "",
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
      addFieldDialogVisible:false,
      addTableDialogVisible:false,
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