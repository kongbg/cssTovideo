import { createApp } from 'vue'
import './assets/style/reset.css'
import './assets/style/style.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import JsonEditorVue from 'json-editor-vue3'
import ComponentAutoRegister from "@/utils/ComponentAutoRegister"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import store from './store'
import router from './router'

import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

new ComponentAutoRegister(app, import.meta.glob('@/components/**/*.vue'));

app.use(store)
app.use(router)
app.use(JsonEditorVue)

app.use(ElementPlus,{
    locale: zhCn,
})
app.mount('#app')
