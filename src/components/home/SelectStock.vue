<template>

  <input
      class="text-center"
      id="stock-input"
      list="SelectStock"
      placeholder="請輸入或選擇股票"
      v-model="selected"
      @focus="selected = ''"
      @compositionstart="isTyping = true"
      @compositionend="isTyping = false"
      @keyup.enter="selectFirstMatchOption"
      @blur="selected === '' ? selected = null : selected"
  >
  <datalist id="SelectStock">
    <option
        v-for="opt in stocks"
        :id="opt.id"
        :number="opt.number"
        :value="opt.number + ' '+ opt.name"
    >
    </option>
  </datalist>
</template>

<script setup>

  import { onMounted, ref } from "vue";
  import { getStockList } from "@/server/stock.js";

  const selected = defineModel('selected')
  let isTyping = ref(false);
  let stocks = ref([])

  onMounted(async () => {
    stocks.value = await getStockList({'skip': 0, 'limit': 5000})
  })

  /* 選擇 匹配第一選項 */
  const selectFirstMatchOption = function (event) {
    // 中文模式還在輸入中，不用判斷
    if (isTyping.value) { return }

    // 所有 option 的 value
    let options = Array.from(document.querySelectorAll('#SelectStock option')).map(el => el.value);

    // 配對與輸入框相近的數據
    let relevantOptions = options.filter(opt => opt.includes(selected.value));

    if (relevantOptions.length > 0) {
        // 如果配對完全相同，則不設定輸入框
        if (relevantOptions[0] === selected.value ) { return }
        // 輸入框 設定為 配對數據第一項的值
        selected.value = relevantOptions[0]
    }
    event.target.blur();
  }


</script>

<style scoped>
#stock-input {
    width: 80%;
    font-size: 1.25rem;
}
</style>