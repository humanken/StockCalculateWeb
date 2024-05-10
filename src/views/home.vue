<template>
  <div>
    <!-- 標題欄 (導航欄) -->
    <Navbar
        :fixed-top="true"
        :navbar-use-animate-bg="navbarUseAnimateBg"
        brand-text="股票試算"
        :contents-in-collapse="[
          { href: '#head', text: '回頂部' },
          { href: '#single-stock-section', text: '單筆試算' },
          { href: '#all-stock-section', text: '多筆試算' },
          { href: '#introduce', text: '暸解更多' },
        ]"
    />

    <!-- 開頭畫面 -->
    <section id="head" class="animation-bg justify-content-center">
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
  </div>
</template>


<script setup>
  import { onMounted, onUnmounted, ref } from "vue";
  import Navbar from "../components/Navbar.vue";
  import BtnHeaderSection from "../components/home/HeaderSectionBtn.vue";
  import SelectSingleStock from "../components/home/SingleStockSelect.vue";
  import BtnCalculate from "../components/home/CalculateBtn.vue";
  import CarouselCategory from "../components/home/CategoryCarousel.vue";

  const selectedStockNumber = ref()
  const idSingleSection = ref('single-stock-section')
  const idAllSection = ref('all-stock-section')

  let headerSectionPos = 0
  const navbarUseAnimateBg = ref(false);

  onMounted(() => {
    const $headerSection = $('#head');
    headerSectionPos = $headerSection.offset().top + $headerSection.outerHeight() - $('#idNav').outerHeight();
    window.addEventListener('scroll', handleScroll);
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  })

  function handleScroll() {
    navbarUseAnimateBg.value = $(this).scrollTop() >= 480;
    console.log('listener scroll: ', navbarUseAnimateBg.value)
  }

</script>


<style scoped>

/* <section id="head"> */
#head {
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
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