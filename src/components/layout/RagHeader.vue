<template>
  <el-row class="dark" align="middle">
    <el-col :span="2">
      <div style="display: flex;align-items: center;text-align: center">
        <el-image :src="logo" style="width: 30px"/>
        <el-text size="small" truncated>&nbsp;&nbsp;RAG's A Generator</el-text>
      </div>
    </el-col>
    <el-col :span="20">
      <el-menu mode="horizontal" :router="true" :default-active="activeMenuItem">
        <el-menu-item v-for="menuItem in menuItems" :key="menuItem.path" :index="menuItem.path">
          {{ menuItem.name }}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="1">
      <el-switch size="large" v-model="darkMode" :inline-prompt="true" inactive-icon="Sunny" active-icon="Moon"
                 inactive-color="#DADADA" active-color="#333333" style="margin-left: -5vh"/>
    </el-col>
    <el-col :span="1">
      <el-button v-if="userInformation.userRole==''" @click="userDialogVisible.loginDialogVisible=true">登录</el-button>
      <el-dropdown v-else>
        <el-icon size="250%" style="cursor: pointer">
          <Icon :icon="userCircle" color="#aaa" />
        </el-icon>
        <template #dropdown>
          <el-button text size="large" @click="logout">
            注销
          </el-button>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>
  <LoginDialog/>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useDark, useToggle} from "@vueuse/core";
import {useUserDialogVisibleStore, useUserInformationStore} from "../../store/index";
import LoginDialog from "../user/LoginDialog.vue";
import {Icon} from "@iconify/vue";
import userCircle from '@iconify-icons/ph/user-circle';
import {requestPost} from "../../api/util/commons";
import {ElMessage} from "element-plus";
import logo from "../../assets/logo.png"

let userDialogVisible=useUserDialogVisibleStore()
let userInformation=useUserInformationStore()

let menuItems: RouterItem[] = [
  {
    path: 'index',
    name: '主页',
    children: []
  },
  {
    path: 'dict',
    name: '词典',
    children: []
  },
  {
    path: 'field',
    name: '字段',
    children: []
  },
  {
    path: 'table',
    name: '表',
    children: []
  },
  {
    path: 'database',
    name: '数据库',
    children: []
  },
  {
    path: 'job',
    name: '作业',
    children: []
  }
]
let activeMenuItem = ref("index");

let darkMode = useDark();
watch(darkMode, (value) => {
  if (value) {
    useToggle(darkMode)
  }
})

function logout(){
  requestPost('/user_info/logout',{}).then((data)=>{
    if(data.code!==20000){
      ElMessage.error("注销失败："+data.message)
    }
    else {
      userInformation.logged=false
      userInformation.id = -1
      userInformation.userName = ""
      userInformation.userAccount = ""
      userInformation.userRole = ""
      userInformation.userPassword = ""
      userInformation.createTime = ""
      userInformation.updateTime = ""
      ElMessage.info("注销成功")
    }
  })
}

</script>

<style scoped>


::v-deep(.el-menu--horizontal) {
  border-bottom: none;
}
</style>