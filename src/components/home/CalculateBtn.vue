<template>
  <button
      v-if="btnId === 'btn-single'"
      type="button"
      class="btn-my-self"
      :id="btnId"
      :data-content="dataContent = (props.btnContent === null ? '未選擇' : props.btnContent.split(' ')[0])"
      @click="goToResult"
  >
  </button>

  <button
      v-if="btnId === 'btn-all'"
      type="button"
      class="btn-my-self"
      :id="btnId"
      data-content="勾選的類別"
      @click="goToResult"
  >
  </button>
</template>

<script setup>

  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { ElMessage } from "element-plus";

  const props = defineProps({
    btnId: {
      required: true
    },
    btnContent: {
      required: false,
      default: '未選擇'
    }
  })


  let dataContent = ref('');

  const router = useRouter();
  function goToResult(event) {
    if (event.target.id === 'btn-single') {
      if (dataContent.value === "未選擇") {
        showMsg("請選擇要進行試算的股票", 'error', true);
        return
      }
      const params = { tableType: 'table-single', stockNumbers: [dataContent.value] }
      router.push({ name: "Result", state: { params: params }})
    } else {
      const params = { tableType: 'table-all' }
      router.push({ name: "Result", state: { params: params }})
    }

  }

  function showMsg(msg, type, showClose=true) {
    /**
     * type: 'error', 'warning', 'success', 'info'
     */
    return ElMessage({
      showClose: showClose, message: msg, type: type
    })
  }

</script>

<style scoped>

.btn-my-self{
    background: none;
    border: 3px solid;
    border-radius: 10px;
    font-family: "montserrat", sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 12px 20px;
    min-width: 150px;
    min-height: 60px;
    margin: 1.2rem 1.8rem 1.2rem 1.8rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.btn-my-self::after{
    border-radius: 5px;
    content: attr(data-content);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: transform 0.5s;
    transform-origin: 0 0;
    transition-timing-function: cubic-bezier(0.5,1.6,0.4,0.7);
    transform: scaleY(0);
}

#btn-single{
    color: green;
    border-color: green;
}
#btn-single:hover {
    color: white;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}


#btn-all{
    color: orange;
    border-color: orange;
}
#btn-all:hover {
    color: #000;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
}
#btn-all::after{
    background-color: orange;
}


#btn-single::before, #btn-all::before {
    content: "開始試算";
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.4s;
}
#btn-single::after{
  background-color: green;
}
#btn-single:hover::before, #btn-all:hover::before{
    top: 150%;
}
#btn-single:hover::after, #btn-all:hover::after{
    transform: scaleY(1);
}

</style>