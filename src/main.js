import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import { startLoadingService, closeLoading } from "@/utils/loading.js";


const app = createApp(App)
    .use(router)
    .use(ElementPlus)


app.provide('$showLoading', startLoadingService)
app.provide('$closeLoading', closeLoading)

app.mount('#app')
