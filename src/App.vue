<script setup lang="ts">
import Layout from "./views/layout/RagLayout.vue";
import {onMounted} from "vue";
import {requestGet} from "./api/util/commons";
import {useUserInformationStore} from "./store/index";

onMounted(()=>{
  requestGet('/user_info/get/login',[]).then((data)=>{
    if(data.code===20000){
      let userInfo:UserInfo=data.data as UserInfo
      let userInformation=useUserInformationStore()
      userInformation.logged=true
      userInformation.id = userInfo.id
      userInformation.userName = userInfo.userName
      userInformation.userAccount = userInfo.userAccount
      userInformation.userRole = userInfo.userRole
      userInformation.userPassword = userInfo.userPassword
      userInformation.createTime = userInfo.createTime
      userInformation.updateTime = userInfo.updateTime
    }
  })
})
</script>

<template>
  <Layout/>
</template>

<style scoped>
</style>
