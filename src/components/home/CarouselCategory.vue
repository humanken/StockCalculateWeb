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

  import { onMounted, reactive, ref } from "vue";
  import { Swiper, SwiperSlide } from "swiper/vue";
  import { Navigation, Autoplay } from "swiper/modules";
  import "swiper/swiper-bundle.css"
  import { getItem, setItem } from "@/server/localStorage.js";
  import { getCategoryList } from "@/server/stock.js";

  let swiperInstance = ref('');
  let isTwseChecked = ref(true);

  const data = reactive({
    'twse': {'row': 0, 'cats': []}, 'otc': {'row': 0, 'cats': []},
    'col': 5, 'excludes': []
  })

  onMounted(async () => {

    data.excludes =  await getItem('excludes', []);
    data.twse.cats = await getCategoryList(true, false);
    data.otc.cats = await getCategoryList(false, true);

    dynamicChangeRowCol();
    window.addEventListener('resize', dynamicChangeRowCol)
  })

  function handleCheckboxClick(sector_id) {
    const index = data.excludes.indexOf(sector_id)
    if (index !== -1) {
      data.excludes.splice(index, 1)  // splice replace delete
    } else {
      data.excludes.push(sector_id)
    }
    setItem('excludes', data.excludes)
  }

  function dynamicChangeRowCol() {
    const width = window.innerWidth;
    if (width <= 600) { data.col = 2 }
    else if (600 < width && width <= 700) { data.col = 3 }
    else if (700 < width && width <= 800) { data.col = 4 }
    else { data.col = 5 }
    data.twse.row = Math.floor(data.twse.cats.length / data.col) + 1
    data.otc.row = Math.floor(data.otc.cats.length / data.col) + 1
  }

</script>

<style scoped>
.swiper {
  max-width: 100%;
}
</style>