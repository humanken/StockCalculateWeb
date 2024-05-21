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
          {
            id: 'updateDividend',
            text: '股利最後更新：' + state.update.dividend
          },
          {
            id: 'updatePrice',
            text: '收盤價最後更新：' + state.update.price
          }
        ]"
    />

    <!-- 試算結果表格 -->
    <Card>
      <template #body>
        <TableResult></TableResult>
      </template>
      <template #footer>
        <PaginationResult></PaginationResult>
      </template>
    </Card>
  </div>
</template>

<script setup>

import {onBeforeMount, reactive, onMounted, onUnmounted} from "vue";
  import { useRouter } from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  import Card from "@/components/result/Card.vue";
  import TableResult from "@/components/result/ResultTable.vue";
  import PaginationResult from "@/components/result/ResultPagination.vue";
import {useCalculateServer, readState, setState} from "@/utils/calculate.js";
  import { getFinalUpdateTime } from "@/server/other.js";
  import { useLoadingServer } from "@/utils/loading.js";

  const router = useRouter();
  const calculate = useCalculateServer();
  const loading = useLoadingServer();
  const { dataState } = readState();
  const setDataState = setState().dataState;
  const state = reactive({
    update: { price: '', dividend: '' }
  })

  onBeforeMount(() => {
    if (!loading.isRunning()) { loading.start(); }
  })

  onMounted(async () => {
    // 取得最後更新時間
    state.update = await getFinalUpdateTime();

    const waitingTimer = setInterval(() => {
      if (dataState.isDataReady) {
        loading.close();
        clearInterval(waitingTimer);

        if (dataState.isLazyLoading) {
          calculate.lazyLoading({ limit: 1000, milliSecond: 6000 });
        }

      }
    }, 1000);
  })

  onUnmounted(() => {
    setDataState.initData();
  })

</script>

<style scoped>

.result-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>