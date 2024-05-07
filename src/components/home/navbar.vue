<template>
  <nav class="navbar fixed-top navbar-expand-sm" :class="isNavbarNeedBg ? 'animation-bg' : ''" id="header">
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand btn text-center" href="/" id="a-logo">
          <img id="img-logo" src="@/assets/icon/Logo.png" alt="Logo" style="height: 1.5rem">
          股票試算系統
      </a>
      <!-- 依照畫面大小，使用navbar-toggler-icon -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 會被放入 navbar-toggler 的內容 -->
      <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-lg-0">
              <li class="nav-item">
                  <a class="nav-link ms-3 me-3" :class="$route.hash == '#head'? 'active': ''" href="#head" role="button">首頁</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-danger ms-3 me-3" :class="$route.hash == '#single-stock-section'? 'active': ''" href="#single-stock-section" role="button">單筆試算</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-danger ms-3 me-3" :class="$route.hash == '#all-stock-section'? 'active': ''" href="#all-stock-section" role="button">多筆試算</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-dark ms-3 me-3" :class="$route.hash == '#introduce'? 'active': ''" href="#introduce" role="button">系統介紹</a>
              </li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from "vue";

  let headerSectionPos = 0
  const isNavbarNeedBg = ref();

  onMounted(() => {
    const $headerSection = $('#head');
    headerSectionPos = $headerSection.offset().top + $headerSection.outerHeight() - $('#header').outerHeight();
    window.addEventListener('scroll', handleScroll);
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  })

  function handleScroll() {
    isNavbarNeedBg.value = $(this).scrollTop() >= headerSectionPos;
  }

</script>

<style scoped>

#a-logo:hover {
  color: white;
}

.navbar-nav .nav-link.active, .navbar-nav .show>.nav-link {
  color: white;
}
</style>