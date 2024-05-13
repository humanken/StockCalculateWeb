<template>
  <nav class="navbar navbar-expand-sm"
       :class="(fixedTop ? 'fixed-top' : '') + ' '+ (navbarUseAnimateBg ? 'animation-bg' : 'no-animate-bg')"
       id="idNav"
  >
    <div class="container-fluid">
      <!-- Logo -->
      <a class="navbar-brand btn text-center" href="/" id="a-logo">
          <img src="@/assets/icon/Logo.png" alt="Logo">
          {{ brandText }}
      </a>
      <!-- 依照畫面大小，使用navbar-toggler-icon -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 會被放入 navbar-toggler 的內容 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <!-- TODO(新增或刪除，監聽寬度->動態改變direction) -->
        <el-anchor :offset="10" :bound="250" :direction="containerClientWidth >= 576 ? 'horizontal': 'vertical'" type="underline" class="navbar-nav me-auto mb-lg-0">
          <template v-for="item in contentsInCollapse">
            <el-anchor-link
              v-if="item.isBack"
              class="nav-item"
              @click.native="$router.go(-1);"
            >
              {{ item.text }}
            </el-anchor-link>

            <el-anchor-link
              v-else
              class="nav-item"
              :href="item.href ?? null"
              v-title="item.title ?? null"
              v-target="item.target ?? null"
            >
              {{ item.text }}
            </el-anchor-link>
          </template>
        </el-anchor>
        <!-- 更新資料 日期/時間 -->
        <span
          v-for="item in updatesInCollapse"
          class="navbar-text text-black-50 ms-2 me-2"
          :id="item.id"
        >
          {{ item.text }}
        </span>
      </div>
    </div>
  </nav>

</template>

<script setup>

  import { onMounted, ref } from "vue";

  const props = defineProps({
    fixedTop: { required: false },
    navbarUseAnimateBg: { required: true },
    brandText: { required: true },
    contentsInCollapse: { required: true },
    updatesInCollapse: { required: false, default: [] }
  })

  const vTitle = {
    mounted: (el, binding) => {
      if (!binding.value) { return }
      el.firstChild.setAttribute('title', binding.value)
    }
  }

  const vTarget = {
    mounted: (el, binding) => {
      if (!binding.value) { return }
      el.firstChild.setAttribute('target', binding.value)
    }
  }

  <!-- TODO(新增或刪除，監聽寬度->動態改變direction) -->
  const containerClientWidth = ref(0);
  onMounted(() => {
    containerClientWidth.value = document.getElementById('idNav').parentElement.clientWidth
  })


</script>

<style scoped>

nav.no-animate-bg {
  background-color: rgba(255, 255, 255, 0.2);
}

#a-logo:hover {
  color: white;
}
#a-logo img {
  height: 1.5rem;
}

.el-anchor {
  background-color: revert;
  --el-anchor-marker-bg-color: white;
}
.el-anchor :deep(.el-anchor__link) {
  font-size: 1rem;
}
.el-anchor :deep(.el-anchor__link.is-active) {
  color: white;
}
</style>