<template>
  <el-tabs type="border-card" tab-position="top" v-model="activeName">

    <el-tab-pane label="關於網頁" name="0">
      <div class="about-html">
        <el-divider content-position="left">基本介紹</el-divider>
        <div class="base-introduce">
          <p>依據股票10年的股利資料和收盤價，計算殖利率。</p>
          <p>計算殖利率2%~8%時的股票價格，讓你快速挑選心目中的股票。</p>
        </div>

        <el-divider content-position="center"></el-divider>
        <p>網頁採用
          <b class="text-danger">前、後端分離設計</b>
        </p>

        <el-divider content-position="left">前端</el-divider>
        <p>
          使用
          <a href="https://vitejs.dev/" target="_blank"> Vite </a>和
          <a href="https://vuejs.org/" target="_blank"> Vue 3 </a>進行構建。
        </p>
        <p>
          搭配
          <a href="https://getbootstrap.com/" target="_blank"> Bootstrap 5 </a>
          及
          <a href="https://element-plus.org/en-US/" target="_blank"> Element Plus </a>
          設計具有<b class="text-danger">響應式功能</b>，使網頁能適應不同設備螢幕尺寸的顯示效果。
        </p>
        <p>
          此外，進行 HTTP 請求則是使用
          <a href="https://axios-http.com/docs/intro" target="_blank"> Axios </a>來實現，以獲取和提交資料給後端。
        </p>

        <el-divider content-position="left">後端</el-divider>
        <p>
          使用
          <a href="https://fastapi.tiangolo.com/" target="_blank"> FastAPI </a>和
          <a href="https://www.python.org/" target="_blank"> Python </a>進行開發。
        </p>
        <p>FastAPI 是一個具有高性能優勢的 Web 框架，適合建立 APIs。</p>
        <p>使用 Python 編寫各種 API 接口，以及負責資料抓取和處理。</p>
        <p>資料來源部分，請查看
          <a class="link-primary" type="button" @click="switchTabTo(3)">
            關於資料
          </a>
        </p>
      </div>
    </el-tab-pane>
    <el-tab-pane label="關於計算" name="1">
      <div class="about-calculate">
        <el-divider content-position="left">股利資料</el-divider>
        <p>計算 前10年 現金與股票的平均股利</p>
        <p class="text-secondary">* 未滿10年股票則以目前擁有的資料計算平均 *</p>

        <el-divider content-position="left">目前殖利率</el-divider>
        <code>(現金平均股利 / 收盤價) x 100%</code>

        <el-divider content-position="left">投資報酬率 (ROI)</el-divider>
        <p><code>(淨收入 / 成本) x 100%</code></p>
        <p>
          <b>淨收入 : </b>
          <code>現金平均股利 x 1000 + (股票平均股利 / 10 x 收盤價) x 1000</code>
        </p>
        <p>
          <b>成本 : </b>
          <code>收盤價 x 1000</code>
        </p>
        <p class="text-secondary"> * 以一張 (1000股) 進行計算 * </p>

        <el-divider content-position="left">
          殖利率2%～8%，推算股票價格
        </el-divider>
        <p><code>(現金平均股利 / 殖利率) x 100%</code></p>
        <span><mark class="mark-red">接近殖利率5% 適合賣出</mark>
        <mark class="mark-green">接近殖利率7% 適合買入</mark></span>
        <p class="text-secondary">* 使用TradingView程式，進行回測推論結果 *</p>
      </div>

    </el-tab-pane>
    <el-tab-pane label="關於更新" name="2">
      <div>
        <h4 class="text-primary">後端更新期間，網站將暫停訪問</h4>
        <el-divider content-position="left">股利</el-divider>
        <mark> 每週一 00:00 A.M ~ 00:30 A.M.</mark>
        <el-divider content-position="left">收盤價</el-divider>
        <mark> 每天 00:00 A.M ~ 00:30 A.M.</mark>
      </div>
    </el-tab-pane>
    <el-tab-pane label="關於資料" name="3">
      <div>
        <el-divider content-position="left">股票類別</el-divider>
        <p>
          來源來自於
          <a href="https://tw.stock.yahoo.com/class/" target="_blank">Yahoo股市 類股報價</a>
        </p>

        <el-divider content-position="left">股票基本資訊</el-divider>
        <p>
          來源來自於 Yahoo股市 各類股報價，
          <a href="https://tw.stock.yahoo.com/class-quote?sectorId=1&exchange=TAI" target="_blank">
            此連結為 水泥類股基本資訊
          </a>
        </p>

        <el-divider content-position="left">股票收盤價</el-divider>
        <p>
          上市： 來源來自於
          <a href="https://openapi.twse.com.tw/" target="_blank">
            台灣證券交易所 API
          </a>
        </p>
        <p>
          上櫃： 來源來自於
          <a href="https://www.tpex.org.tw/openapi/" target="_blank">
            證券櫃檯買賣中心 API
          </a>
        </p>

        <el-divider content-position="left">每年股利資料</el-divider>
        <p>
          來源來自於 Goodinfo!台灣股市資訊網，
          <a href="https://goodinfo.tw/tw/StockDividendPolicyList.asp?MARKET_CAT=%E5%85%A8%E9%83%A8&INDUSTRY_CAT=%E5%85%A8%E9%83%A8&YEAR=2024" target="_blank">
            此連結為 2024目前已配發的股利資料</a>
        </p>

      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>

  import { ref } from "vue";

  const activeName = ref('0');

  const switchTabTo = (name) => {
    activeName.value = typeof name === "number" ? name.toString() : name
  };

</script>

<style scoped>
.el-tabs {
  width: 100%;
}

.el-tabs .el-tab-pane .base-introduce p{
  --bs-text-opacity: 1;
  color: rgba(var(--bs-success-rgb),var(--bs-text-opacity))!important;
  font-size: 1.6rem;
  font-weight: bold;
}

.el-tabs .el-tab-pane a{
  --bs-text-opacity: 1;
  color: rgba(var(--bs-primary-rgb),var(--bs-text-opacity))!important;
  font-weight: bold;
}
.el-tabs .el-tab-pane mark.mark-red {
  background-color: red;
  color: white;
  margin: 0.5rem;
}
.el-tabs .el-tab-pane mark.mark-green {
  background-color: green;
  color: white;
  margin: 0.5rem;
}
</style>