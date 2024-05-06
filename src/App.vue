<template>
  <div>
  <RouterView />
  </div>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";

  const router = useRouter();


</script>

<style scoped>

</style>
