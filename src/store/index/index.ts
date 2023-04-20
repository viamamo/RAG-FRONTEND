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
      addTableDialogVisible:false
    }
  }
})

export const useUserInformationStore = defineStore('userInformation',{
  state:()=>{
    return {
      logged:false,
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

export const useGeneratedResultsStore = defineStore('generatedResults',{
  state:()=>{
    return {
      generationVO:{} as GenerationVO
    }
  }
})