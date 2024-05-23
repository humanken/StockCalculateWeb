<template>
  <div class="header-btn-wrapper show-slide-down slide-delay-2">
    <a type="button" :href="'#' + singleSectionHash">
          單筆股票試算
    </a>
    <a type="button" :href="'#' + allSectionHash">
        多筆股票試算
    </a>
  </div>
</template>

<script setup>

  defineProps({
    'singleSectionHash': {
      required: true
    },
    'allSectionHash': {
      required: true
    }
  })

</script>

<style scoped>

.header-btn-wrapper {
  width: 756px;
  height: 30vh;
  position: absolute;
  top: 58%;
  left: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.header-btn-wrapper a {
  background-color: transparent;
  color: white;
  text-decoration: none;
  border: 2px solid #fff;
  border-radius: 2.4rem;
  padding: 18px 34px;
  font-size: 1.6rem;
  font-weight: bold;
}

.header-btn-wrapper a:hover {
  color: #000;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2);
}

@media (max-width: 756px) {
  .header-btn-wrapper { width: 100%; }
}
</style>