<template>
  <div class="w-100 text-center">
    <span style="font-weight: bold">篩選類別</span>
  </div>

  <hr>

  <div class="btn-group w-100 mb-4" role="group">
    <input
      type="radio" class="btn-check col-6"
      name="btnradio" id="twse-cats-btn"
      @click="swiperInstance.slidePrev(500)"
      :checked="isTwseChecked"
    >
    <label class="btn btn-outline-secondary" for="twse-cats-btn">上市</label>

    <input
      type="radio" class="btn-check col-6"
      name="btnradio" id="otc-cats-btn"
      @click="swiperInstance.slideNext(500)"
      :checked="!isTwseChecked"
    >
    <label class="btn btn-outline-secondary" for="otc-cats-btn">上櫃</label>
  </div>

  <swiper
    :modules="[Autoplay, Navigation]"
    :slides-per-view="1"
    :autoplay="false"
    @swiper="(instance) => {swiperInstance = instance}"
    @slide-change="isTwseChecked = !isTwseChecked"
  >
    <swiper-slide class="table-responsive">
      <table-category
          type="twse"
          :col="data.col" :row="data.twse.row"
          :cat-list="data.twse.cats"
          :excludes="data.excludes"
          @checkbox-click="handleCheckboxClick"
      />
    </swiper-slide>
    <swiper-slide class="table-responsive">
      <table-category
          type="otc"
          :col="data.col" :row="data.otc.row"
          :cat-list="data.otc.cats"
          :excludes="data.excludes"
          @checkbox-click="handleCheckboxClick"
      />
    </swiper-slide>
  </swiper>

</template>

<script setup>

  import { computed, onMounted, onUnmounted, reactive, ref } from "vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Autoplay } from "swiper/modules";
  import "swiper/swiper-bundle.css"
  import { getItem, setItem } from "@/server/localStorage.js";
  import { getCategoryList } from "@/server/stock.js";
  import { useMediaQuery } from "@/utils/mediaQuery";

  let swiperInstance = ref('');
  let isTwseChecked = ref(true);

  const data = reactive({
    twse: {
      cats: [],
      row: computed(() => Math.floor(data.twse.cats.length / data.col) + 1)
    },
    otc: {
      cats: [],
      row: computed(() => Math.floor(data.otc.cats.length / data.col) + 1)
    },
    col: 5, excludes: []
  })

  onMounted(async () => {

    data.excludes =  await getItem('excludes', []);
    data.twse.cats = await getCategoryList(true, false);
    data.otc.cats = await getCategoryList(false, true);

    // 建立媒體查詢
    mediaQueryLists = mediaQuery.create(Object.keys(MEDIA_QUERY_COLUMN_CONDITIONS));

    // 新增Column媒體查詢監聽，fnFirst：是否先執行
    mediaQuery.startListener(mediaQueryLists, mediaMatchChangeColumn, true);
  })

  onUnmounted(() => {
    mediaQuery.removeListener(mediaQueryLists, mediaMatchChangeColumn);
  })

  /**
   * 判斷 Local Storage 的 excludes 是否存在 sector_id。
   * 存在 -> 從 excludes 陣列中 刪除此 sector_id;
   * 不存在 -> 新增 sector_id 到 excludes 陣列
   * 儲存進 Local Storage
   * @param sector_id
   */
  function handleCheckboxClick(sector_id) {
    const index = data.excludes.indexOf(sector_id)
    if (index !== -1) {
      data.excludes.splice(index, 1)  // splice replace delete
    } else {
      data.excludes.push(sector_id)
    }
    setItem('excludes', data.excludes)
  }

  // ----------------------- Column Media Match ------------------------------

  let mediaQueryLists = [];
  const mediaQuery = useMediaQuery();
  const MEDIA_QUERY_COLUMN_CONDITIONS = {
    '(max-width: 600px)': 2,
    '(min-width: 601px) and (max-width: 700px)': 3,
    '(min-width: 701px) and (max-width: 800px)': 4,
    '(min-width: 801px)': 5
  }

  function mediaMatchChangeColumn(event) {
    if (event.matches) {
      data.col = MEDIA_QUERY_COLUMN_CONDITIONS[event.media]
    }
  }

</script>

<style scoped>
.swiper {
  max-width: 100%;
}
</style>