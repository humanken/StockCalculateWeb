<template>
  <nav class="navbar fixed-top navbar-expand-sm" id="header" :style="bgColor.style">
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
              <li class="nav-item active">
                  <a class="nav-link ms-3 me-3" href="#head" role="button">首頁</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-danger ms-3 me-3" href="#single-stock-section" role="button">單筆試算</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-danger ms-3 me-3" href="#all-stock-section" role="button">多筆試算</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link link-dark ms-3 me-3" href="#introduce" role="button">系統介紹</a>
              </li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive } from "vue";

  let headerSectionPos = 0
  const bgColor = reactive({'style': {'background-color': 'rgba(255, 255, 255, 0.2'}})

  onMounted(() => {
    const $headerSection = $('#head');
    headerSectionPos = $headerSection.offset().top + $headerSection.outerHeight() - $('#header').outerHeight();
    window.addEventListener('scroll', handleScroll);
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  })

  function handleScroll() {
    if ($(this).scrollTop() >= headerSectionPos) {
      bgColor.style = {
        'background-image': 'linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)',
        'background-size': '200% 200%',
        'background-position': 'center',
        'animation': 'bg-animate 8s ease-in-out infinite'
      }
    } else {
      bgColor.style = {'background-color': 'rgba(255, 255, 255, 0.2'}
    }
  }

</script>

<style scoped>
#a-logo:hover {
  color: white;
}
</style>