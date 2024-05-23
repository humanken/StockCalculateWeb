import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index.js";
import "element-plus/dist/index.css"


const app = createApp(App)
    .use(router)

app.mount('#app')
