<template>
  <div class="card border-warning">

    <h2 class="card-header">
      多筆股票 試算
    </h2>

    <div class="card-body">
      <CarouselCategory />
    </div>

    <div class="card-footer bg-transparent">
      <BtnCalculate btn-id="btn-all" />
    </div>

  </div>
</template>

<script setup>

  import CarouselCategory from "@/components/home/CategoryCarousel.vue";
  import BtnCalculate from "@/components/home/CalculateBtn.vue";

</script>

<style scoped>
.card {
  text-align: center;
  width: 90%;
}
.card .card-body {
  min-height: 25vh;
}
</style>