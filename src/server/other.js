import axios from "@/server/axios.js";


export async function getFinalUpdateTime() {
    return axios.get('/updateTime')
}