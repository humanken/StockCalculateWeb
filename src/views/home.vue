<template>
  <div class="home-container container-fluid">
    <!-- 標題欄 (導航欄) -->
    <Navbar
        :fixed-top="true"
        :navbar-use-animate-bg="navbarUseAnimateBg"
        brand-text="股票試算"
        :contents-in-collapse="[
          { href: '#header-section', text: '回頂部' },
          { href: '#single-stock-section', text: '單筆試算' },
          { href: '#all-stock-section', text: '多筆試算' },
          { href: '#introduce', text: '暸解更多' },
        ]"
    />

    <!-- 開頭畫面 -->
    <section id="header-section" class="animation-bg">
      <div class="header-text-wrapper">
        <h1 class="header-title show-slide-down">Wellcome</h1>
        <p class="header-detail show-slide-down slide-delay-1">想知道股票的買賣點<br>點擊下列按鈕</p>
      </div>
      <btn-scroll :single-section-hash="idSingleSection" :all-section-hash="idAllSection"/>
    </section>
    <!-- 單筆股票 試算 區塊 -->
    <section :id="idSingleSection">
      <card-home>
        <template #title>單筆股票 試算</template>

        <template #body>
          <select-stock v-model="stockNumberSelected" />
        </template>

        <template #footer>
          <btn-calculate btn-id="btn-single" :btn-content="stockNumberSelected" />
        </template>
      </card-home>
    </section>
    <hr>

    <!-- 多筆股票 試算 區塊 -->
    <section :id="idAllSection">
      <card-home>
        <template #title>多筆股票 試算</template>

        <template #body>
          <carousel-category />
        </template>

        <template #footer>
          <btn-calculate btn-id="btn-all" />
        </template>
      </card-home>
    </section>
    <hr>

    <section id="introduce">
      <label>瞭解更多</label>
    </section>

  </div>
</template>


<script setup>
  import { onMounted, onUnmounted, ref } from "vue";

  const stockNumberSelected = ref();


  const idSingleSection = ref('single-stock-section')
  const idAllSection = ref('all-stock-section')

  const navbarUseAnimateBg = ref(false);


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

.header-text-wrapper {
  width: 100%;
  min-height: 40vh;
  text-align: center;
  position: absolute;
  top: 24%;
  left: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.header-text-wrapper .header-title {
    color: #fff;
    font-size: 5.2rem;
}

.header-text-wrapper .header-detail {
    color: slategray;
    font-size: 2rem;
}

.show-slide-down {
  animation: slide-down-enter 1s ease-out forwards;
}
.slide-delay-1 {
  opacity: 0;
  animation-delay: 1s;
}
.slide-delay-2 {
  opacity: 0;
  animation-delay: 2s;
}
@keyframes slide-down-enter {
    from { opacity: 0; transform: translateY(-50%); }
    to { opacity: 1; transform: translateY(0%); }
}
@keyframes slide-down-leave {
    from { opacity: 1; transform: translateY(0%); }
    to { opacity: 0; transform: translateY(50%); }
}

@media (max-width: 576px) {
  .header-text-wrapper {
    top: 15%;
  }

  .header-text-wrapper .header-title {
    font-size: 4.2rem;
  }

  .header-text-wrapper .header-detail {
      font-size: 1.4rem;
  }

  :deep(.header-btn-wrapper) {
    top: 55%;
    flex-direction: column;
  }
}

@media (max-height: 524px) {
  .header-text-wrapper h1.show-slide-down {
    /* 滑入和滑出動畫組合，需停留 1s，所以 leave 延遲 1s後 開始 */
    animation: slide-down-enter 1s ease-out forwards, slide-down-leave 1s ease-out forwards 1s;
  }

  .header-text-wrapper p.show-slide-down {
    position: relative;
    top: -5.5rem;
  }

}

</style>