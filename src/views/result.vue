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

  import { onBeforeMount, onErrorCaptured, inject, ref } from "vue";
  import { useRouter } from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  import CardTableResult from "@/components/result/ResultTable.vue";

  const router = useRouter()
  const closeLoading = inject('$closeLoading')
  const tableType = ref('')

  onBeforeMount(() => {
    // 必須在掛載前，確認table type，否則CardTableResult無法得到值
    if (history.state.hasOwnProperty('params')) {
      tableType.value = history.state.params.tableType
    }
    else {
      router.replace({name: 'Home'})
      closeLoading();
    }
  })

  onErrorCaptured((err, instance, info) => {
    console.log('error captured: ', err, instance, info)
    closeLoading();
    const e = { status: 'Error Mounted', detail: '網頁掛載失敗，請重新載入' }
    router.replace({ name: 'Error', state: { params: e } });
  })


  // TODO(新增功能： 取得更新日期和時間)
  // -------------------------------- Update ----------------------------------------

</script>

<style scoped>

.result-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>