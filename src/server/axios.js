import axios from "axios";
import router from "@/router/index.js";

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
    const status = [404, 500]
    if (error.hasOwnProperty('response') && status.includes(error.response.status)) {
        const e = { status: error.response.status, detail: error.response.data.detail }
        router.push({ name: 'Error', state: { params : e }})
    }
    else if (!error.hasOwnProperty('response')) {
        const e = { status: error.message, detail: '網路異常，請檢查網路連線或稍後再試' }
        router.push({ name: 'Error', state: { params : e }})
    }
    else if (!status.includes(error.response.status)) {
        return Promise.reject(error)
    }

})


export default axios