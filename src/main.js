import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import ElementPlus, {ElMessage} from "element-plus"
import "element-plus/dist/index.css"


const app = createApp(App)
    .use(router)
    .use(ElementPlus)


function showMsg(msg, type, showClose=true) {
    /**
     * type: 'error', 'warning', 'success', 'info'
     */
    return ElMessage({
        showClose: showClose, message: msg, type: type, duration: 5000
    })
}

app.provide('$showMsg', showMsg)
app.mount('#app')
