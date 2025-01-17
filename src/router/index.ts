import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Index from "../views/index/Index.vue";
import Dict from "../views/dict/Dict.vue";
import Field from "../views/field/Field.vue";
import Table from "../views/table/Table.vue";
import DataBase from "../views/database/Database.vue";
import Job from "../views/job/Job.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name:'index',
    component:Index,
    meta:{
      active:"/index"
    }
  },
  {
    path:'/dict',
    name:'dict',
    component:Dict,
    meta:{
      active:"/dict"
    }
  },
  {
    path:'/field',
    name:'field',
    component:Field,
    meta:{
      active:"/field"
    }
  },
  {
    path:'/table',
    name:'table',
    component:Table,
    meta:{
      active:"/table"
    }
  },
  {
    path:'/database',
    name:'database',
    component:DataBase,
    meta:{
      active:"/database"
    }
  },
  {
    path:'/job',
    name:'job',
    component:Job,
    meta:{
      active:"/job"
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router