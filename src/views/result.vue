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
    <CardTableResult :type="state.tableType" @loading-end="closeLoading" />
  </div>
</template>

<script setup>

  import { onBeforeMount, onErrorCaptured, inject, reactive, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  import CardTableResult from "@/components/result/CardResultTable.vue";
  import { getFinalUpdateTime } from "@/server/other.js";

  const router = useRouter()
  const closeLoading = inject('$closeLoading')
  const state = reactive({
    tableType: '',
    update: { price: '', dividend: '' }
  })

  onBeforeMount(() => {
    // 必須在掛載前，確認table type，否則CardTableResult無法得到值
    if (history.state.hasOwnProperty('params')) {
      state.tableType = history.state.params.tableType
    }
    else {
      router.replace({name: 'Home'})
      closeLoading();
    }
  })

  onMounted(async () => {
    // 取得最後更新時間
    state.update = await getFinalUpdateTime();
  })

  onErrorCaptured((err, instance, info) => {
    console.log('error captured: ', err, instance, info)
    closeLoading();
    const e = { status: 'Mounted Error', detail: '網頁掛載失敗，請重新載入' }
    router.replace({ name: 'Error', state: { params: e } });
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