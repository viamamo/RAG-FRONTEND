import {defineStore} from "pinia";
import {nanoid} from "nanoid";
import {FormInstance} from "element-plus";


export const useMetaTableStore=defineStore('metaTable',{
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
      metaTableFormRef: {} as FormInstance,
      metaFieldListFormRef:{} as FormInstance
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

export const useUserInformationStore = defineStore('addDialogVisible',{
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
