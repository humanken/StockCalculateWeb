<template>
  <el-table
    class-name="result-table"
    :data="state.data.slice(
        (paginationState.currentPage - 1) * paginationState.pageSize,
         paginationState.currentPage * paginationState.pageSize
        )"
    border
    @sort-change="changeTableSort"
    :cell-style="{textAlign: 'center'}"
    :cell-class-name="cellClassName"
    :header-cell-class-name="headerCellClassName"
    @cellMouseEnter="cellMouseEnter"
    @cellMouseLeave="cellMouseLeave"
  >
    <el-table-column label="名稱 (代號)" min-width="125" fixed="left">
      <template v-slot:default="scope">
        <a :href="scope.row.stockDividendURL" target="_blank" title="查看歷史股利分配率">
          {{ scope.row.stockFullName }}
        </a>
      </template>
    </el-table-column>
    <el-table-column label="收盤價" prop="stockPrice" min-width="110" sortable="custom"></el-table-column>
    <el-table-column label="目前殖利率" prop="averageYield" min-width="150" sortable="custom"></el-table-column>
    <el-table-column label="ROI" prop="roi" min-width="100" sortable="custom"></el-table-column>
    <el-table-column label="平均股利 (現金/股票)" prop="averageDividend" min-width="210"></el-table-column>

    <template v-for="i in (dataState.request.yield.end - dataState.request.yield.start + 1)">
      <el-table-column
        :label="(dataState.request.yield.start + i - 1).toString() + '%'"
        :prop="'yield' + (dataState.request.yield.start + i - 1).toString() + 'ConvertPrice'"
        min-width="85"
      ></el-table-column>
    </template>

  </el-table>
</template>

<script setup>

  import { reactive, watch } from "vue";
  import { readState } from "@/utils/calculate.js";

  const { dataState, paginationState } = readState()

  const state = reactive({
    hoverColIndex: undefined,
    hoverRowIndex: undefined,
    data: JSON.parse(JSON.stringify(dataState.data))
  })

  // ---------------------------- Table Sortable -----------------------------------
  function changeTableSort(column) {
    const field = column.prop
    const sortType = column.order
    let sortData = state.data

    // 不排序，使用只讀屬性的資料恢復原本順序
    if (!sortType) {
      state.data = dataState.data
      return
    }

    // string 轉成 float
    if (['averageYield', 'roi'].includes(field)) {
      sortData.map(item => {
        item[field] = item[field].replace('%', '')
      })
    }

    if (sortType === 'descending') {
      sortData = sortData.sort((a, b) => b[field] - a[field])
    } else {
      sortData = sortData.sort((a, b) => a[field] - b[field])
    }

    // float 轉成 string
    if (['averageYield', 'roi'].includes(field)) {
      sortData.map(item => { item[field] = `${item[field]}%` });
    }

    state.data = sortData
  }

  // ------------------------------ Cell Hover -------------------------------------
  function cellClassName({row, column, rowIndex, columnIndex}) {
    row.rowIndex = rowIndex
    column.columnIndex = columnIndex

    if (rowIndex === state.hoverRowIndex && columnIndex === state.hoverColIndex) {
      return 'select-row select-col'
    }
    else if (rowIndex === state.hoverRowIndex) {
      return 'select-row'
    }
    else if (columnIndex === state.hoverColIndex) {
      return 'select-col'
    }
  }

  function headerCellClassName({columnIndex}) {
    if (columnIndex === state.hoverColIndex) {
      return 'select-col'
    }
  }

  function cellMouseEnter(row, column) {
    state.hoverRowIndex = row.rowIndex
    state.hoverColIndex = column.columnIndex
  }

  function cellMouseLeave() {
    state.hoverRowIndex = undefined
    state.hoverColIndex = undefined
  }

  // --------------------------- Watch Props Data ----------------------------------
  watch(() => dataState.data, (newData) => {
    state.data = JSON.parse(JSON.stringify(newData));
  })

</script>

<style scoped>

@media (max-width: 1024px) {
  .result-table { font-size: unset; }
}
@media (min-width: 1024px){
  .result-table { font-size: 1.2rem; }
}

/* 表格的標頭 */
.result-table :deep(.el-table__header-wrapper .el-table__header th) {
  text-align: center;
  border: 0;
  background-color: #1989ff;
  color: white;
}
/* 與hover cell同一列的標頭 */
.result-table :deep(.el-table__header-wrapper .el-table__header th.select-col) {
  border-left: 1px solid #949966;
  border-right: 1px solid #949966;
}
/* hover cell */
.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td:hover) {
  border: 1px solid #949966;
  background-color: rgba(148, 153, 102, 0.2);
}
/* 與hover cell同一行 */
.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td.select-row) {
  border-top: 1px solid #949966;
  border-bottom: 1px solid #949966;
}
/* 與hover cell同一列 */
.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td.select-col) {
  border-left: 1px solid #949966;
  border-right: 1px solid #949966;
}
</style>