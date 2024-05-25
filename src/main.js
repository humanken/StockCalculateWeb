import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import "element-plus/dist/index.css"
import ElementPlus from "element-plus";
import { zhTw } from "element-plus/es/locale/index";


const app = createApp(App)
    .use(router)
    // 全域切換為中文
    .use(ElementPlus, { locale: zhTw })


app.mount('#app')
