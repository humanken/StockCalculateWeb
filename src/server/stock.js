import axios from "@/server/axios.js";


export async function getCategoryList(isTwse = true, isOtc = true) {
    return axios.get('/categories', {params: {'twse': isTwse, 'otc': isOtc}})
}

export async function getStockList(params) {
    return axios.get('/stocks', {params: params})
}

export async function getStockBy(number) {
    return axios.get('/stock', {params: {'number': number}})
}