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
  import { computed } from "vue";

  const { dataState, paginationState } = readState();
  const setStateMethod = setState().paginationState;

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
  // TODO(新增： 使用媒體查詢 -> 分頁欄更改元件和排版)

  // ------------------------------ Pagination -------------------------------------
  function updateLayoutWithWidth() {
    const cardBodyEl = document.getElementById('resultContainer')
    if (cardBodyEl.clientWidth <= 628) { state.pagination.layout = 'prev, jumper, next, total' }
    else if (cardBodyEl.clientWidth <= 796) { state.pagination.layout = 'prev, pager, next, jumper, total' }
    else { state.pagination.layout = 'sizes, prev, pager, next, jumper, total' }
  }
</script>

<style scoped>
.el-pagination {
  justify-content: center;
}
</style>