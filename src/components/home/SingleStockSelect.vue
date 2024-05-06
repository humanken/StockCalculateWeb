<template>
  <span class="input-group-text" id="inputGroup-sizing-default">名稱</span>
  <input
      class="text-center"
      id="stock-input"
      list="SelectStock"
      aria-describedby="inputGroup-sizing-default"
      placeholder="請輸入股票"
      v-model="selected"
      @focus="selected = ''"
      @keyup.enter="(event) => {selectFirstMatchOption(); event.target.blur()}"
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
  import { onMounted, reactive } from "vue";
  import { getStockList } from "@/server/stock.js";

  const selected = defineModel()
  let stocks = reactive([])

  onMounted(async () => {
      let nextOffset = 0;
      const limit = 1000;
      while (true) {
        const data = await getStockList({'skip': nextOffset, 'limit': limit})
        if (!data.length) { break }
        stocks.push(...data)
        nextOffset += limit;
      }
  })

  /* 選擇 匹配第一選項 */
  const selectFirstMatchOption = function () {
      // 所有 option 的 value
      let options = Array.from($(`#SelectStock option`)).map(function(el){return el.value;});

      // 配對與輸入框相近的數據
      let relevantOptions = options.filter(function(option){
          return option.toLowerCase().includes(selected.value.toLowerCase());
      }); // filtering the data list based on input query
      if(relevantOptions.length > 0){
          // 如果配對完全相同，則不設定輸入框
          if (relevantOptions[0] === selected.value ) { return }
          // 輸入框 設定為 配對數據第一項的值
          selected.value = relevantOptions[0]
      }
  }


</script>

<style scoped>
#stock-input {
    width: 86%;
    font-size: 1.25rem;
}
</style>