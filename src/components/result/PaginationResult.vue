<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="dataState.info.length"
    :page-sizes="paginationState.pageSizeList"
    :layout="paginationState.layout"
  ></el-pagination>
</template>

<script setup>

  import { readState, setState } from "@/utils/calculate.js";
  import { computed, onBeforeMount, onUnmounted, reactive } from "vue";
  import { useMediaQuery } from "@/utils/mediaQuery";

  const { dataState, paginationState } = readState();
  const setStateMethod = setState().paginationState;

  const state = reactive({ mqls: [] })

  const mediaQuery = useMediaQuery();

  onBeforeMount(() => {
    // 建立媒體查詢
    state.mqls = mediaQuery.create(Object.keys(MEDIA_QUERY_LAYOUT_CONDITIONS));

    // 新增pagination媒體查詢監聽，fnFirst：是否先執行
    mediaQuery.startListener(state.mqls, mediaMatch, true);
  })

  onUnmounted(() => {
    mediaQuery.removeListener(state.mqls, mediaMatch);
    state.mqls = [];
  })

  // ----------------------------- Computed -------------------------------------

  const currentPage = computed({
    get: () => paginationState.currentPage,
    set: (newValue) => {
      setStateMethod.updateCurrentPage(newValue);
    }
  })

  const pageSize = computed({
      get: () => paginationState.pageSize,
      set: (newValue) => {
        setStateMethod.updatePageSize(newValue);
      }
  })

  // ----------------------- Pagination Media Match ------------------------------

  const MEDIA_QUERY_LAYOUT_CONDITIONS = {
    '(max-width: 628px)': 'prev, jumper, next, total',
    '(min-width: 629px) and (max-width: 796px)': 'prev, pager, next, jumper, total',
    '(min-width: 797px)': 'sizes, prev, pager, next, jumper, total'
  }

  function mediaMatch(event) {
    if (event.matches) {
      setStateMethod.updateLayout(MEDIA_QUERY_LAYOUT_CONDITIONS[event.media])
    }
  }

</script>

<style scoped>
.el-pagination {
  justify-content: center;
}
</style>