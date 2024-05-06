import axios from "@/server/axios.js";


export async function getCalculateResult(params) {
    /**
     * params: { numbers: list, yieldStart: int, yieldEnd: int }
     */
    return await axios.post('/calculates', params)
}


export async function getQueryCalculateResult(params) {
    /**
     * params: { skip: int, limit: int, excludes: list, yieldStart: int, yieldEnd: int }
     */
    return await axios.post('/calculatesQuery', params)
}