<template>
  <nav class="navbar navbar-expand-lg" id="header">
    <div class="container-fluid">
      <a class="navbar-brand btn text-center" href="/result">
          <img id="img-logo" src="@/assets/icon/Logo.png" alt="Logo" style="height: 1.5rem">
          試算表
      </a>
      <a class="navbar-nav ms-2 me-2 link-success" href="/#all-stock-section" role="button">返回 首頁</a>
      <a class="navbar-nav ms-2 me-2 link-danger" href="https://www.tdcc.com.tw/portal/zh/smWeb/qryStock" target="_blank" title="開啟集保戶股權分散表" role="button">查詢 大股東比例</a>
      <a class="navbar-nav ms-2 me-2 link-danger" href="https://invest.wessiorfinance.com/stock.html" target="_blank" role="button">存股 試算</a>
      <!-- 依照畫面大小，使用navbar-toggler-icon -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 會被放入 navbar-toggler 的內容 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto"><li class="nav-item"></li></ul>
        <!-- 股利更新資料 日期 -->
        <span class="navbar-text text-black-50 ms-2 me-2" id="update-dividend"></span>
        <!-- 現價更新資料 時間 -->
        <span class="navbar-text text-black-50 ms-2 me-2" id="update-price"></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
#header{
    background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
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