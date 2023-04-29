import {createApp} from 'vue'
import {createPinia} from "pinia";
import './style.css'
import App from './App.vue'
import router from './router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/dark/css-vars.css'

import 'default-passive-events'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
  .use(pinia)
  .mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}