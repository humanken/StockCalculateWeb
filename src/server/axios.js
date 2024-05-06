import axios from "axios";
import router from "../router/index.js";

// console.log('import.meta.env: ', import.meta.env)

axios.defaults.baseURL = import.meta.env.MODE === "development" ? 'http://127.0.0.1:8000': '/api'
axios.defaults.headers = {
    'X-Requested-With': 'XMLHttpRequest'
}
axios.defaults.withCredentials = true
axios.defaults.responseType = "json"
axios.defaults.responseEncoding = "utf-8"
axios.defaults.maxContentLength = 200000


axios.interceptors.response.use(resp => {
    if (resp.status !== 200) { return Promise.reject(resp) }
    return resp.data
}, error => {
    router.push({path: error.status === 404 ? '/error404': '/error500'})
    return Promise.reject(error)
})

export default axios