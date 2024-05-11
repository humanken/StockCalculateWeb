<template>
  <div class="home-container container-fluid">
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
    <section id="head" class="animation-bg">
      <h1 class="text-center" id="head-title">歡迎使用<br>股票試算系統</h1>
      <BtnHeaderSection :single-section-hash="idSingleSection" :all-section-hash="idAllSection"/>
    </section>
    <!-- 單筆股票 試算 區塊 -->
    <section :id="idSingleSection">
      <CardForSingle />
    </section>
    <hr>

    <!-- 多筆股票 試算 區塊 -->
    <section :id="idAllSection">
      <CardForAll />
    </section>
    <hr>

    <section id="introduce">
          <label>瞭解更多</label>
    </section>

  </div>
</template>


<script setup>
import {onActivated, onMounted, onUnmounted, ref} from "vue";
  import { useRoute } from "vue-router";
  import Navbar from "../components/Navbar.vue";
  import BtnHeaderSection from "../components/home/HeaderSectionBtn.vue";
  import CardForSingle from "../components/home/single/card.vue"
  import CardForAll from "../components/home/all/card.vue"


  const idSingleSection = ref('single-stock-section')
  const idAllSection = ref('all-stock-section')

  const navbarUseAnimateBg = ref(false);

  onActivated(() => {
    const route = useRoute();
    // window.scrollTo({left: 0, top: route.params.scrollTop, behavior: "instant"})
  })

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  })

  function handleScroll() {
    navbarUseAnimateBg.value = $(this).scrollTop() >= 480;
  }

</script>


<style scoped>

/* <section id="head"> */

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

.home-container {
  display: flex !important;
  flex-direction: column !important;
  justify-content: center;
  padding: 0;
}

section {
  min-height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>