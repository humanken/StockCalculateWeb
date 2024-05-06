<template>
  <!-- 標題欄 (導航欄) -->
  <Navbar />

  <!-- 開頭畫面 -->
  <section id="head" class="justify-content-center">
    <h1 class="text-center" id="head-title">歡迎使用<br>股票試算系統</h1>
    <BtnHeaderSection :single-section-hash="idSingleSection" :all-section-hash="idAllSection"/>
  </section>

  <!-- 單筆股票 試算 區塊 -->
  <section :id="idSingleSection" class="row select-stock-section">
    <div class="col-6" id="single-stock-box">
        <h3 class="text-center">單筆股票 試算</h3>
        <hr>
        <div class="col-6 input-group m-1 d-flex align-items-center" id="singleSelect">
            <SelectSingleStock v-model="selectedStockNumber" />
        </div>
        <div class="col-12 start-calculate d-flex justify-content-center">
            <BtnCalculate btn-id="btn-single" :btn-content="selectedStockNumber" />
        </div>
    </div>
  </section>
  <hr>

  <!-- 多筆股票 試算 區塊 -->
  <section :id="idAllSection" class="row select-stock-section">
      <div class="col-10" id="all-stock-box">
        <h3 class="text-center mb-3">多筆股票 試算</h3>
        <CarouselCategory />
        <div class="col-12 start-calculate d-flex justify-content-center">
          <BtnCalculate btn-id="btn-all" />
        </div>
      </div>
  </section>
  <hr>

  <section id="introduce" style="height: 10rem;">
        <label>瞭解更多</label>
  </section>
</template>


<script setup>
  import { ref } from "vue";
  import Navbar from "../components/home/navbar.vue";
  import BtnHeaderSection from "../components/home/HeaderSectionBtn.vue";
  import SelectSingleStock from "../components/home/SingleStockSelect.vue";
  import BtnCalculate from "../components/home/CalculateBtn.vue";
  import CarouselCategory from "../components/home/CategoryCarousel.vue";

  const selectedStockNumber = ref()
  const idSingleSection = ref('single-stock-section')
  const idAllSection = ref('all-stock-section')

</script>


<style scoped>

/* <section id="head"> */
#head {
    background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
    background-size: 200% 200%;
    background-position: center;
    animation: bg-animate 8s ease-in-out infinite;
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
}
@keyframes bg-animate {
    0% {background-position: 0 0;}
    50% {background-position: 100% 100%;}
    100% {background-position: 0 0;}
}

#head-title {
    color: #fff;
    font-size: 4rem;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: slide-in 1s ease-out forwards;
}
@keyframes slide-in {
    from {opacity: 0;transform: translate(-50%, -100%);}
    to {opacity: 1;transform: translate(-50%, -50%);}
}

/* <section class="select-stock-section"> */
.select-stock-section {
    width: 100vw;
    height: auto;
    display: flex;
    position: relative;
    justify-content: center;
    padding-top: 5rem;
}

#single-stock-box {
    position: relative;
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-items: center;
    justify-content: space-evenly;
}

@media (max-width: 880px) {
  #singleSelect {
    justify-content: space-around;
  }
}
</style>