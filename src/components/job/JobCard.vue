<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <el-text size="large">SQL作业</el-text>
      </div>
    </template>
    <div>
      <el-input v-model="search" placeholder="Enter to search" @keydown.enter="refreshPage"/>
    </div>
    <el-table :data="jobVOList" table-layout="auto" style="padding-top: 10px" @row-click="openInfoDialog">
      <el-table-column label="id" prop="id"/>
      <el-table-column label="主机" prop="host"/>
      <el-table-column label="端口" prop="port"/>
      <el-table-column label="数据库类型" prop="dbType"/>
      <el-table-column label="数据库名" prop="dbName"/>
      <el-table-column label="表名" prop="tableName"/>
      <el-table-column label="已完成条数" prop="finishedNum"/>
      <el-table-column label="模拟条数" prop="mockNum"/>
      <el-table-column label="状态" prop="status"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.status=='未开始'||scope.row.status=='已完成'||scope.row.status=='已撤销'"
                     @click="executeJob(scope.$index,scope.row)">
            开始
          </el-button>
          <el-button v-else-if="scope.row.status=='已完成'" @click="rollbackJob(scope.$index, scope.row)">
            撤销
          </el-button>
          <el-button :disabled="scope.row.status=='执行中'" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="display: flex;padding-top: 10px">
      <el-pagination style="margin-left: auto;margin-right: auto" background layout="prev, pager, next" :total="total"
                     :current-page="current" :page-size="10" @current-change="refreshPage"/>
    </div>
  </el-card>
  <JobInfoDialog ref="jobInfoDialogRef"/>
</template>

<script setup lang="ts">
import {onActivated, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {requestPost, requestTableData} from "../../api/util/commons";
import {getJobStatus} from "../../api/job/function";
import JobInfoDialog from "./JobInfoDialog.vue";

const props = defineProps<{
  url: string,
}>()

const search = ref('')
let current = ref(1)
let total = ref(0)
let jobVOList = ref<JobVO[]>()
let jobInfoNow=ref()
let jobInfoDialogRef=ref()
let dialogMetaField=ref()

const refreshPage = async (value?: number) => {
  if (typeof value === "number") {
    current.value = value
  }
  let params: GenericGetRequest = {
    sortOrder: "ASC",
    sortColumn: "id",
    paginationNum: current.value,
    paginationSize: 10,
    searchParam: search.value
  }
  await requestTableData<JobInfo>(props.url, params).then((data) => {
    if (data.code === 20000) {
      total.value = data.data.total
      jobVOList.value = data.data.records.map((value: JobInfo) => {
        let metaTable = JSON.parse(value.content) as MetaTable
        let jobVO: JobVO = {
          id: value.id,
          finishedNum: value.finishedNum,
          mockNum: value.mockNum,
          status: getJobStatus(value.status),
          dbName: value.dbName,
          dbType: value.dbType,
          host: value.host,
          port: value.port,
          metaFields: metaTable.metaFieldList,
          tableName: value.tableName,
          exception: value.exception,
          userId: value.userId,
          createTime: value.createTime,
          updateTime: value.updateTime,
        }
        return jobVO
      })
    } else {
      ElMessage({
        message: data.message,
        type: 'error'
      })
    }
  })
}

const handleDelete = (index: number, row: JobVO) => {
  ElMessageBox.confirm(
      `确认要删除该作业吗?`,
      "",
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
    .then(() => {
      if (row.status == '已完成') {
        ElMessageBox.confirm(
          `该作业尚未撤销，确认要删除该作业吗？`,
          "",
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          requestPost('/job_info/delete', {
            id: row.id
          }).then((data) => {
            if (data.code !== 20000) {
              ElMessage.error('删除失败:' + data.message)
            } else {
              ElMessage.success('删除成功')
              refreshPage()
            }
          })
        }).catch((e: any) => {
          throw e
        })
      } else {
        requestPost('/job_info/delete', {
          id: row.id
        }).then((data) => {
          if (data.code !== 20000) {
            ElMessage.error('删除失败:' + data.message)
          } else {
            ElMessage.success('删除成功')
            refreshPage()
          }
        })
      }
    })
    .catch(() => {
      ElMessage.info('取消删除')
    })
}

function executeJob(index: number, row: JobVO) {
  ElMessageBox.confirm(
    `确认要执行该作业吗?`,
    "",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    jobVOList.value![index].status = '执行中'
    requestPost('/job_info/execute', {
      id: row.id
    }).then((data) => {
      if (data.code != 20000) {
        ElMessage.error(data.message)
      }
      ElMessage.success("开始执行")
      setTimeout(() => {
        refreshPage()
      }, 1000)
    })
  }).catch(() => {
    ElMessage.info('取消执行')
  })
}

function rollbackJob(index: number, row: JobVO) {
  ElMessageBox.confirm(
    `确认要撤销该作业吗?`,
    "",
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    jobVOList.value![index].status = '执行中'
    requestPost('/job_info/rollback', {
      id: row.id
    }).then((data) => {
      if (data.code != 20000) {
        ElMessage.error(data.message)
      }
      ElMessage.success("撤销成功")
      refreshPage()
    })
  }).catch(() => {
    ElMessage.info('取消撤销')
  })
}

function openInfoDialog(row: JobVO) {
  jobInfoDialogRef.value.jobInfo=row
  jobInfoDialogRef.value.dialogVisible=true
}

onActivated(() => {
  refreshPage()
})

</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>