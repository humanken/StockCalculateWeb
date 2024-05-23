<template>
  <div class="card border-warning">

    <h2 class="card-header">
      <slot name="title"></slot>
    </h2>

    <div class="card-body">
      <slot name="body"></slot>
    </div>

    <div class="card-footer">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "CardHome"
}
</script>

<style scoped>
.card {
  text-align: center;
  width: 90%;
}
.card .card-body {
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card .card-footer {
  background-color: transparent;
}
</style>