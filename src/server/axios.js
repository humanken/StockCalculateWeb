import axios from "axios";
import router from "@/router/index.js";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
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
    if (!error.hasOwnProperty('response')) {
        goNetworkErrorView(error);
    }
    else {
        goResponseErrorView(error);
    }
    return Promise.reject(error)
})


export default axios


function goNetworkErrorView(error) {
    const e = { status: error.message, detail: '網路異常，請檢查網路連線或稍後再試' }
    router.push({ name: 'Error', state: { params : e }})
}

function goResponseErrorView(error) {
    const e = { status: error.response.status, detail: error.response.data.detail }
    router.push({ name: 'Error', state: { params : e }})
}