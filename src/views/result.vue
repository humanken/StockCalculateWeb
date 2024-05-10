<template>
  <div>
  <!-- 標題欄 (導航欄) -->
  <Navbar
      navbar-use-animate-bg="false"
      brand-text="試算結果"
      :contents-in-collapse="[
        { colorClassName: 'link-success', href: '/', text: '返回 首頁' },
        {
          colorClassName: 'link-danger',
          href: 'https://www.tdcc.com.tw/portal/zh/smWeb/qryStock',
          title: '開啟集保戶股權分散表',
          text: '查詢 大股東比例',
          target: '_blank'
        },
        {
          colorClassName: 'link-danger',
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

  <!-- table 資料 -->
  <div class="result-table-wrapper">
    <TableResult :type="tableType" @loading-end="closeLoading" />
  </div>
  </div>
</template>

<script setup>

  import Navbar from "@/components/Navbar.vue";
  import { ref, onMounted } from "vue";
  import { ElLoading } from "element-plus";
  import TableResult from "@/components/result/ResultTable.vue";

  const tableType = ref(history.state.params.tableType)

  onMounted(() => {
    loadingComponent = ElLoading.service({
      lock: true,
      fullscreen: true,
      text: loadingText,
      background: 'rgba(0, 0, 0, 0.9)'
    })
    dynamicLoading()
  })

  // -------------------------------- Loading ----------------------------------------
  let loadingComponent = null;
  const loadingText = ref('試算中');
  let dynamicTimer = [];

  function dynamicLoading() {
    const textTimer = setInterval(() => {
      if (loadingText.value === '試算中...') { loadingText.value = '試算中'; return }
      loadingText.value += '.'
    }, 1000)

    const imgTimer = setInterval(() => {
      // 添加隨機數，避免瀏覽器緩存
      let gifPath = `/src/assets/image/Loading.gif?${Math.random()}`
      loadingComponent.$el.style.backgroundImage = `url(${gifPath})`
    }, 4000)
    dynamicTimer = [textTimer, imgTimer]
  }

  function closeLoading() {
    const closeTimer = setTimeout(() => {
      loadingComponent.close();
      dynamicTimer.forEach(clearInterval);
      clearTimeout(closeTimer)
    }, 4000)
  }

</script>

<style>

.result-table-wrapper {
  height: 80vh;
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 2rem 1rem 1rem 1rem;
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