<script setup lang="ts">
import Layout from "./views/layout/RagLayout.vue";
import {onMounted} from "vue";
import {requestGet} from "./function/util/commons";
import {useBasicInfoStore, useDictStore, useUserInformationStore} from "./store/index";

onMounted(()=>{
  requestGet('/user_info/get/login',[]).then((data)=>{
    if(data.code===20000){
      let userInfo:UserInfo=data.data as UserInfo
      let userInformation=useUserInformationStore()
      userInformation.isLogin=true
      userInformation.id = userInfo.id
      userInformation.userName = userInfo.userName
      userInformation.userAccount = userInfo.userAccount
      userInformation.userRole = userInfo.userRole
      userInformation.userPassword = userInfo.userPassword
      userInformation.createTime = userInfo.createTime
      userInformation.updateTime = userInfo.updateTime
    }
  })
  requestGet('/dict_info/my/list',[]).then((data)=>{
    if(data.code===20000){
      let dictList=data.data as DictInfo[]
      useDictStore().$patch({dictInfoList: dictList})
    }
  })
  requestGet('/sql/get_basic_info',[]).then((data)=>{
    if(data.code===20000){
      useBasicInfoStore().$patch({
        DATABASE_TYPES: data.data.databaseTypes,
        FAKER_TYPES: data.data.fakerTypes,
        FIELD_TYPES: data.data.fieldTypes,
        MOCK_TYPES: data.data.mockTypes
      })
    }
  })
})
</script>

<template>
  <Layout/>
</template>

<style scoped>
</style>
