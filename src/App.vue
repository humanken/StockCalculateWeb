<template>
  <div>
  <RouterView />
  </div>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";

  const router = useRouter();


</script>

<style>
.animation-bg {
  background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 55%, #FFBAC3 100%);
  background-size: 200% 200%;
  background-position: center;
  animation: bg-animate 8s ease-in-out infinite;
}
@keyframes bg-animate {
    0% {background-position: 0 0;}
    50% {background-position: 100% 100%;}
    100% {background-position: 0 0;}
}
</style>
