import { createApp } from 'vue'
import App from './App.vue'

// storage
import Vue3Storage, {StorageType} from "vue3-storage"

// And design V4
import Antd from 'ant-design-vue'
import {message} from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'


const app = createApp(App)

app.use(Antd)
  .use(Vue3Storage, { namespace: "wfd__", storage: StorageType.Local })

app.config.globalProperties.$message = message

app.mount('#app')

