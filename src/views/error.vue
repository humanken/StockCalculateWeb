<template>
  <div class="error-container">
    <svg viewBox="0 0 837 1045" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
            <path d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z" id="Polygon-1" stroke="#007FB2" stroke-width="6" sketch:type="MSShapeGroup"></path>
            <path d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z" id="Polygon-2" stroke="#EF4A5B" stroke-width="6" sketch:type="MSShapeGroup"></path>
            <path d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z" id="Polygon-3" stroke="#795D9C" stroke-width="6" sketch:type="MSShapeGroup"></path>
            <path d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z" id="Polygon-4" stroke="#F2773F" stroke-width="6" sketch:type="MSShapeGroup"></path>
            <path d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z" id="Polygon-5" stroke="#36B455" stroke-width="6" sketch:type="MSShapeGroup"></path>
        </g>
    </svg>
    <div class="message-box">
      <h1>{{ error.status }}</h1>
      <p style="font-size: 1.6rem;" v-html="error.detail.replace('，', '<br>')"></p>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount } from "vue";
  import { useLoadingServer } from "@/utils/loading.js";

  const loading = useLoadingServer();

  const error = reactive({
    status: 'Page Error',
    detail: '此為錯誤頁面，未取得錯誤訊息'
  })

  onBeforeMount(() => {
    if (loading.isRunning()) { loading.close(); }

    if (history.state.hasOwnProperty('params')) {
      const { status, detail } = history.state.params;
      if (status) { error.status = status }
      if (detail) { error.detail = detail }
    }
    urlClear();
  })

  function urlClear() {
    const url = import.meta.env.PROD ? `${window.location.origin}/web/` : `${window.location.origin}/`
    history.replaceState(null, null, url)
  }

</script>

<style>
body {
  background-color: #2F3242;
}
.error-container {
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.error-container svg,
.error-container .message-box {
  width: 380px;
  height: 500px;
}
.message-box {
  color: #FFF;
  font-family: Roboto;
  font-weight: 300;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.message-box h1 {
  font-size: 4.8rem;
  line-height: 4.8rem;
  margin-bottom: 40px;
}

#Polygon-1 , #Polygon-2 , #Polygon-3 , #Polygon-4 , #Polygon-4, #Polygon-5 {
  -webkit-animation: float 1s infinite ease-in-out alternate;
          animation: float 1s infinite ease-in-out alternate;
}
#Polygon-2 {
  -webkit-animation-delay: .2s;
          animation-delay: .2s;
}
#Polygon-3 {
  -webkit-animation-delay: .4s;
          animation-delay: .4s;
}
#Polygon-4 {
  -webkit-animation-delay: .6s;
          animation-delay: .6s;
}
#Polygon-5 {
  -webkit-animation-delay: .8s;
          animation-delay: .8s;
}

@-webkit-keyframes float {
	100% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
  }
}

@keyframes float {
	100% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
  }
}

@media (max-width: 796px) {
  svg {
    position: absolute;
    z-index: -100;
  }
}
@media (max-height: 500px) {
  .error-container svg,
  .error-container .message-box {
  width: 100%;
  height: 100%;
}
}
</style>