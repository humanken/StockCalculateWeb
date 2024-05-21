<template>
  <div class="card">

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
  name: "Card"
}
</script>

<style scoped>

.card {
  text-align: center;
  position: absolute;
  top: 78px;
  width: 90%;
  max-height: 90vh;
}

.card .card-body {
  min-height: 30vh;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.card .card-footer {
  padding: 0;
  background-color: transparent;
}
</style>