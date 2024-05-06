<template>

  <!-- 標題欄 (導航欄) -->
  <Navbar />

  <!-- table 資料 -->
  <div class="result-table-wrapper">
    <TableResult :type="tableType" @loading-end="closeLoading" />
  </div>

</template>

<script setup>

  import Navbar from "@/components/result/Navbar.vue";
  import { ref, onMounted, reactive } from "vue";
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