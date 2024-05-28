import {reactive, ref} from "vue";
import { ElLoading } from "element-plus";
import loadingGif from "../assets/image/Loading.gif"

const state = reactive({
    isRunning: false,
    component: null,
    text: '試算中',
    timers: [undefined, undefined]
})

export const useLoadingServer = () => {
    const startTextTimer = () => {
        return setInterval(() => {
            if (state.text === '試算中...') {
                state.text = '試算中'
            }
            else {
                state.text += '.'
            }
            state.component.setText(state.text);
        }, 1000)
    }

    const startImgTimer = () => {
        return setInterval(() => {
            // 添加隨機數，避免瀏覽器緩存
            state.component.$el.style.backgroundImage = `url(${loadingGif}?${Math.random()})`
        }, 4000)
    }

    const show = () => {
        if (state.component && state.isRunning) { return }
        state.component = ElLoading.service({
            lock: true,
            fullscreen: true,
            text: state.text,
            background: 'rgba(0, 0, 0, 0.9)'
        })
        state.timers = [ startTextTimer(), startImgTimer() ]
        state.isRunning = true;
    }

    const close = () => {
        const closeTimer = setTimeout(() => {
            state.component.close();
            state.component = null;
            state.timers.forEach(clearInterval);
            state.isRunning = false;
            clearTimeout(closeTimer)
        }, 4000)
    }

    const isRunning = () => { return state.isRunning; }

    return {
        show,
        close,
        isRunning
    }
}