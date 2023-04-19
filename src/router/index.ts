import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import Index from "../views/index/Index.vue";
import Dict from "../views/dict/Dict.vue";
import Field from "../views/field/Field.vue";
import Table from "../views/table/Table.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name:'index',
    component:Index
  },
  {
    path:'/dict',
    name:'dict',
    component:Dict
  },
  {
    path:'/field',
    name:'field',
    component:Field
  },
  {
    path:'/table',
    name:'table',
    component:Table
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router