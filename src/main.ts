import {createApp} from 'vue'
import {createPinia} from "pinia";
import './style.css'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'default-passive-events'

import Schema from 'async-validator';

Schema.warning = function(){};

const pinia = createPinia()

const app = createApp(App)
app.use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}