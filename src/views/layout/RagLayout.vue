<template>
  <div>
    <el-container style="position:absolute;left:0;right:0;top:0;bottom:0;overflow:hidden;">
      <el-header style="height: 8%">
        <RagHeader/>
      </el-header>
      <el-main style="height: 87%;padding-top: 0;padding-bottom: 3px">
        <el-scrollbar>
          <router-view v-slot="{Component}">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
        </el-scrollbar>
      </el-main>
      <el-footer style="height: 25px">
        <RagFooter/>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import RagHeader from "../../components/layout/RagHeader.vue";
import RagFooter from "../../components/layout/RagFooter.vue"
</script>

<style scoped>
</style>