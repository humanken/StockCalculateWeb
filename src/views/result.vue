<template>
  <div class="result-container" id="resultContainer">
    <!-- 標題欄 (導航欄) -->
    <Navbar
        :fixed-top="true"
        navbar-use-animate-bg="false"
        brand-text="試算結果"
        :contents-in-collapse="[
          { isBack: true, text: '返回 首頁' },
          {
            href: 'https://www.tdcc.com.tw/portal/zh/smWeb/qryStock',
            title: '開啟集保戶股權分散表',
            text: '查詢 大股東比例',
            target: '_blank'
          },
          {
            href: 'https://invest.wessiorfinance.com/stock.html',
            title: '開啟存股試算',
            text: '存股 試算',
            target: '_blank'
          }
        ]"
        :updates-in-collapse="[
            { id: 'updateDividend', text: '2024-04-xx' },
            { id: 'updatePrice', text: '22:00' }
        ]"
    />

    <!-- 試算結果表格 -->
    <CardTableResult :type="tableType" @loading-end="closeLoading" />
  </div>
</template>

<script setup>

  import Navbar from "@/components/Navbar.vue";
  import { ref, onMounted, reactive } from "vue";
  import { ElLoading } from "element-plus";
  import CardTableResult from "@/components/result/ResultTable.vue";

  const tableType = ref(history.state.params.tableType)

  const state = reactive({
    loading: {
      component: null,
      text: '試算中',
      timers: [undefined, undefined]
    }
  })

  onMounted(() => {
    startDynamicLoadingService('resultContainer')
  })

  // -------------------------------- Loading ----------------------------------------

  function startDynamicLoadingService(targetID) {
    state.loading.component = ElLoading.service({
      target: document.getElementById(targetID),
      lock: true,
      fullscreen: true,
      text: state.loading.text,
      background: 'rgba(0, 0, 0, 0.9)'
    })
    state.loading.timers = [ startTextTimer(), startImgTimer() ]
  }

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

  function closeLoading() {
    const closeTimer = setTimeout(() => {
      state.loading.component.close();
      state.loading.timers.forEach(clearInterval);
      clearTimeout(closeTimer)
    }, 4000)
  }

  // TODO(新增功能： 取得更新日期和時間)
  // -------------------------------- Update ----------------------------------------

</script>

<style>
.result-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-loading-mask {
  background-image: url("@/assets/image/Loading.gif");
  background-repeat: no-repeat;
  background-position: center;
}

.el-loading-spinner {
  top: 20% !important;
}

.el-loading-spinner .circular {
  display: none !important;
}

.el-loading-spinner .el-loading-text {
  color: white !important;
  font-size: 2rem !important;
}

</style>