<template>
  <div class="card border-warning">

    <h2 class="card-header">
      單筆股票 試算
    </h2>

    <div class="card-body">
      <SelectStock v-model="stockNumberSelected" />
    </div>

    <div class="card-footer">
      <BtnCalculate btn-id="btn-single" :btn-content="stockNumberSelected" />
    </div>

  </div>
</template>

<script setup>

  import { ref } from "vue";
  import SelectStock from "@/components/home/SingleStockSelect.vue";
  import BtnCalculate from "@/components/home/CalculateBtn.vue";

  const stockNumberSelected = ref();

</script>

<style scoped>
.card {
  text-align: center;
  width: 90%;
}
.card .card-body {
  min-height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card .card-footer {
  background-color: transparent;
}
</style>