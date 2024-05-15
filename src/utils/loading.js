import { reactive } from "vue";
import { ElLoading } from "element-plus";

const state = reactive({
    loading: {
        component: null,
        text: '試算中',
        timers: [undefined, undefined]
    }
})

function startTextTimer() {
    return setInterval(() => {
        if (state.loading.text === '試算中...') {
            state.loading.text = '試算中'
        }
        else {
            state.loading.text += '.'
        }
        state.loading.component.setText(state.loading.text);
    }, 1000)
}

function startImgTimer() {
    return setInterval(() => {
        // 添加隨機數，避免瀏覽器緩存
        let gifPath = `/src/assets/image/Loading.gif?${Math.random()}`
        state.loading.component.$el.style.backgroundImage = `url(${gifPath})`
    }, 4000)
}

export function startLoadingService() {
    state.loading.component = ElLoading.service({
        lock: true,
        fullscreen: true,
        text: state.loading.text,
        background: 'rgba(0, 0, 0, 0.9)'
    })
    state.loading.timers = [ startTextTimer(), startImgTimer() ]
}

export function closeLoading() {
    const closeTimer = setTimeout(() => {
        state.loading.component.close();
        state.loading.timers.forEach(clearInterval);
        clearTimeout(closeTimer)
    }, 4000)
}