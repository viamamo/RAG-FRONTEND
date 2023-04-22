<template>
  <el-dialog v-model="userDialogVisible.loginDialogVisible"
             :title="dialogStatus.dialogTitle" :width="330">
    <el-form ref="formRef" :model="dialogStatus">
      <el-form-item prop="userName" v-if="!login" :rules="rules.username">
        <el-input v-model="dialogStatus.userName" autocomplete="" minlength="1" maxlength="16" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="userAccount" :rules="rules.userAccount">
        <el-input v-model="dialogStatus.userAccount" placeholder="请输入账号" minlength="4" maxlength="32" />
      </el-form-item>
      <el-form-item prop="userPassword" :rules="rules.userPassword">
        <el-input v-model="dialogStatus.userPassword" placeholder="请输入密码" minlength="8" maxlength="32" :show-password="true"/>
      </el-form-item>
      <el-form-item prop="checkPassword" v-if="!login" :rules="rules.checkPassword">
        <el-input v-model="dialogStatus.checkPassword" placeholder="请确认密码" minlength="8" maxlength="32" :show-password="true"/>
      </el-form-item>
      <el-space direction="vertical">
        <el-form-item>
          <el-button size="large" @click="submitDialog(formRef)">{{ dialogStatus.buttonText }}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" text @click="changeStatus">{{ dialogStatus.textButtonContent }}</el-button>
        </el-form-item>
      </el-space>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {useUserDialogVisibleStore, useUserInformationStore} from "../../store/index";
import {reactive, ref} from "vue";
import {requestPost} from "../../api/util/commons";
import {ElMessage, FormInstance} from "element-plus";
import {DEFAULT_USER_ROLE} from "../../api/contants";

let login = ref(true)

const formRef=ref<FormInstance>()

const rules=reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 1, max: 16, message: '长度为1~16个字符', trigger: 'blur' },
  ],
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 32, message: '长度为4~32个字符', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 32, message: '长度为8~32个字符', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { min: 8, max: 32, message: '长度为8~32个字符', trigger: 'blur' },
  ],
})

const dialogStatus = reactive({
  dialogTitle: "登录",
  userName: "",
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  buttonText: "登录",
  textButtonContent: "用户注册"
})

let userDialogVisible = useUserDialogVisibleStore()
let userInformation = useUserInformationStore()

function changeStatus() {
  dialogStatus.userName = "";
  dialogStatus.userAccount = "";
  dialogStatus.userPassword = "";
  dialogStatus.checkPassword = "";
  if (login.value) {
    dialogStatus.dialogTitle = "注册";
    dialogStatus.buttonText = "注册"
    dialogStatus.textButtonContent = "已有用户登录"
  } else {
    dialogStatus.dialogTitle = "登录";
    dialogStatus.buttonText = "登录"
    dialogStatus.textButtonContent = "用户注册"
  }
  login.value = !login.value
}

function submitDialog(formEl: FormInstance | undefined) {
  if (!formEl) return
   formEl.validate((valid) => {
    if (valid) {
      if (login.value) {
        requestPost('/user_info/login', dialogStatus).then((data) => {
          if (data.code !== 20000) {
            ElMessage.error("登陆失败：" + data.message)
          } else {
            let userInfo = data.data as UserInfo
            userInformation.logged=true
            userInformation.id = userInfo.id
            userInformation.userName = userInfo.userName
            userInformation.userAccount = userInfo.userAccount
            userInformation.userRole = userInfo.userRole
            userInformation.userPassword = userInfo.userPassword
            userInformation.createTime = userInfo.createTime
            userInformation.updateTime = userInfo.updateTime
            userDialogVisible.loginDialogVisible = false
          }
        })
      } else {
        requestPost('/user_info/register', dialogStatus).then((data) => {
          if (data.code !== 20000) {
            ElMessage.error("注册失败：" + data.message)
          } else {
            userInformation.logged=true
            userInformation.id = data.data as number
            userInformation.userName = dialogStatus.userName
            userInformation.userAccount = dialogStatus.userAccount
            userInformation.userRole = DEFAULT_USER_ROLE
            userInformation.userPassword = dialogStatus.userPassword
            userDialogVisible.loginDialogVisible = false
          }
        })
      }
    }
  })

}

</script>

<style scoped>
</style>