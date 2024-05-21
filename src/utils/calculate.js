import {getCalculateResult, getQueryCalculateResult} from "@/server/calculate.js";
import {computed, reactive, readonly} from "vue";
import {getItem} from "@/server/localStorage.js";


const dataState = reactive({
    info:  { nextOffset: 0, limit: 1000, length: computed(() => {return dataState.data.length}) },
    request: { yield: { start: 2, end: 8 }, excludes: [] },
    isDataReady: false, isLazyLoading: false,
    data: []
})


const paginationState = reactive({
    currentPage: 1,
    pageSize: 100,
    pageSizeList: [100, 200, 300, 400, 500, 1000],
    layout: 'sizes, prev, pager, next, jumper, total'
})


export const useCalculateServer = () => {

    const delDataWithoutPrice = (data) => {
        // 反向遍歷，可避免迴圈中刪除元素的問題
        for (let i = data.length - 1; i >= 0; i--) {
            if (!data[i].stockPrice) {
                data.splice(i, 1);
            }
        }
        return data
    }

    const single = async (numbers) => {
        /**
         * params: numbers
         */
        const params = {
            numbers: numbers,
            yieldStart: dataState.request.yield.start,
            yieldEnd: dataState.request.yield.end,
        }
        dataState.isDataReady = false
        dataState.data = await getCalculateResult(params)
        dataState.isDataReady = true
    }

    const all = async (params) => {
        /**
         * params: { skip , limit }
         */
        dataState.isDataReady = false
        const { skip = dataState.info.nextOffset, limit = dataState.info.limit } = params

        let excludes;
        if (!params.hasOwnProperty('excludes')) {
            excludes = await getItem('excludes', []);
            dataState.request.excludes = excludes
        }
        else { excludes = params.excludes; }

        const resp = await getQueryCalculateResult({
            skip, limit, excludes,
            yieldStart: dataState.request.yield.start,
            yieldEnd: dataState.request.yield.end
        })
        // 取得資料，去除沒有價格的資料
        dataState.data = [...dataState.data, ...delDataWithoutPrice(resp.data)];
        // 儲存回覆的資料
        dataState.info.nextOffset = resp.nextOffset;
        dataState.isDataReady = true
    }

    const lazyLoading = (params) => {
        const { limit = dataState.info.limit, milliSecond = 6000 } = params
        // 避免計時器重疊
        let timer;
        timer && clearInterval(timer);
        // 立即執行函式，只要加上()
        timer = setInterval(async () => {
            // 當所有資料加載完，則清除計時器
            if (!dataState.info.nextOffset) {
                clearInterval(timer);
                dataState.isLazyLoading = false
                return
            }
            // 必須等待上一個資料準備完成再取得新資料
            if (!dataState.isDataReady) { return }
            await all({ limit: limit, excludes: dataState.request.excludes });
        },
        milliSecond)
    }


    return {
        single,
        all,
        lazyLoading
    }
}


export const readState = () => {
    return { dataState: readonly(dataState), paginationState: readonly(paginationState)}
}

export const setState = () => {

    const initData = () => {
        dataState.info.nextOffset = 0;
        dataState.data = []
    }

    const openLazyLoading = () => { dataState.isLazyLoading = true; }

    const updateCurrentPage = (val) => { paginationState.currentPage = val; }

    const updatePageSize = (val) => { paginationState.pageSize = val; }

    return {
        dataState:  { openLazyLoading, initData },
        paginationState: { updateCurrentPage, updatePageSize }
    }
}

