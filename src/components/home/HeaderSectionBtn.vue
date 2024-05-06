<template>
  <a type="button" :href="'#' + singleSectionHash" class="text-center btn-scroll-to-section" style="left: calc(35%);">
        單筆股票試算
  </a>
  <a type="button" :href="'#' + allSectionHash" class="text-center btn-scroll-to-section" style="left: calc(65%);">
      多筆股票試算
  </a>
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
.btn-scroll-to-section {
    width: 14.2rem;
    color: #fff;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 2.4rem;
    padding: 18px 34px;
    font-size: 1.6rem;
    font-weight: bold;
    position: absolute;
    top: calc(50% + 8rem);
    opacity: 0;
    transform: translateX(-50%);
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    animation: fade-in 1s ease-out forwards 0.5s;
}
@keyframes fade-in {
    from {opacity: 0;transform: translate(-50%, 50%);}
    to {opacity: 1;transform: translate(-50%, 0);}
}
.btn-scroll-to-section:hover {
  color: #000;
  background-color: #fff;
  box-shadow: 0 3px 5px rgba(0,0,0,0.2);
}
</style>