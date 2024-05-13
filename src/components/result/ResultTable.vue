<template>
  <!-- 切換為中文 -->
  <el-config-provider :locale="zhTw">
   <div class="card">

    <div class="card-body">
      <!-- 表格資料 -->
      <el-table
          class-name="result-table"
          :data="state.data.slice(
              (state.pagination.currentPage - 1) * state.pagination.pageSize,
              state.pagination.currentPage * state.pagination.pageSize)"
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

        <template v-for="i in (endYield - startYield + 1)">
          <el-table-column
              :label="(startYield + i - 1).toString() + '%'"
              :prop="'yield' + (startYield + i - 1).toString() + 'ConvertPrice'"
              min-width="85"
          ></el-table-column>
        </template>

      </el-table>
    </div>

    <div class="card-footer">
      <!-- 分頁欄 -->
      <el-pagination
        v-model:current-page="state.pagination.currentPage"
        v-model:page-size="state.pagination.pageSize"
        :total="state.dataInfo.length"
        :page-sizes="state.pagination.pageSizeList"
        :layout="state.pagination.layout"
      ></el-pagination>
    </div>

   </div>
  </el-config-provider>
</template>

<script setup>
import {onMounted, onUnmounted, reactive, readonly, ref} from "vue";
  import { zhTw } from "element-plus/es/locale/index";
  import { getCalculateResult, getQueryCalculateResult } from "@/server/calculate.js";
  import { getItem } from "@/server/localStorage.js";

  const props = defineProps({
    type: { required: true },
    startYield: { required: false, type: Number, default: 2 },
    endYield: { required: false, type: Number, default: 8 }
  })

  const loadingEmit = defineEmits(['loadingEnd'])

  onMounted(async function () {
    if (props.type === 'table-single') {
      state.data = await getSingleData()
      state.dataInfo.length = state.data.length
    }
    else if (props.type === 'table-all') {
      state.excludes = await getItem('excludes', [])
      await getDataAndUpdateState();
    }

    // 更新分頁(pagination)排版
    updateLayoutWithWidth();

    // 觸發loading end，關閉Loading畫面
    loadingEmit('loadingEnd', true)
    // 緩加載
    startLazyLoadingData(6000);
    window.addEventListener('resize', updateLayoutWithWidth);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateLayoutWithWidth);
  })
  // -------------------------------- State ---------------------------------------
  const state = reactive({
    pagination: {
      currentPage: 1,
      pageSize: 100,
      layout: 'sizes, prev, pager, next, jumper, total',
      pageSizeList: [100, 200, 300, 400, 500, 1000]
    },
    cellHover: {
      rowIndex: undefined, colIndex: undefined
    },
    dataInfo: {
      nextOffset: 0,
      limit: 1000,
      length: 0
    },
    excludes: [],
    data: [],
    copyData: []
  })

  // -------------------------------- Data ----------------------------------------
  async function getSingleData() {
    const params = {
      numbers: history.state.params.stockNumbers,
      yieldStart: props.startYield,
      yieldEnd: props.endYield
    }
    return await getCalculateResult(params)
  }

  async function getDataAndUpdateState(timer=undefined) {
    if (timer && !state.dataInfo.nextOffset) { clearInterval(timer); return;}
    const resp = await getResponseByQuery()
    // 取得資料，去除沒有價格的資料
    state.data = [...state.data, ...delDataWithoutPrice(resp.data)];
    // 額外儲存資料，不排序時可用來恢復原本順序
    state.copyData = [...state.copyData, ...delDataWithoutPrice(resp.data)]
    // 儲存回覆的資料
    state.dataInfo.nextOffset = resp.nextOffset
    state.dataInfo.limit = resp.limit
    state.dataInfo.length = state.copyData.length
  }

  async function getResponseByQuery() {
    const params = {
      skip: state.dataInfo.nextOffset, limit: state.dataInfo.limit,
      excludes: state.excludes,
      yieldStart: props.startYield,
      yieldEnd: props.endYield
    }
    return await getQueryCalculateResult(params)
  }
  
  function delDataWithoutPrice(data) {
    // 反向遍歷，可避免迴圈中刪除元素的問題
    for (let i = data.length - 1; i >= 0; i--) {
      if (!data[i].stockPrice) {
        data.splice(i, 1)
      }
    }
    return data
  }
  
  function startLazyLoadingData(millisecond) {
    // 避免計時器重疊
    let timer;
    timer && clearInterval(timer);
    // 立即執行函式，只要加上()
    timer = setInterval(() => { getDataAndUpdateState(timer); }, millisecond)
  }

  // ------------------------------ Pagination -------------------------------------
  function updateLayoutWithWidth() {
    const cardBodyEl = document.getElementById('resultContainer')
    if (cardBodyEl.clientWidth <= 628) { state.pagination.layout = 'prev, jumper, next, total' }
    else if (cardBodyEl.clientWidth <= 796) { state.pagination.layout = 'prev, pager, next, jumper, total' }
    else { state.pagination.layout = 'sizes, prev, pager, next, jumper, total' }
  }

  // ---------------------------- Table Sortable -----------------------------------
  function changeTableSort(column) {
    const field = column.prop
    const sortType = column.order
    let sortData = state.data

    // 不排序，使用只讀屬性的資料恢復原本順序
    if (!sortType) {
      state.data = state.copyData
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

    if (rowIndex === state.cellHover.rowIndex && columnIndex === state.cellHover.colIndex) {
      return 'select-row select-col'
    } else if (rowIndex === state.cellHover.rowIndex) {
      return 'select-row'
    } else if (columnIndex === state.cellHover.colIndex) {
      return 'select-col'
    }
  }

  function headerCellClassName({columnIndex}) {
    if (columnIndex === state.cellHover.colIndex) {
      return 'select-col'
    }
  }

  function cellMouseEnter(row, column) {
    state.cellHover.rowIndex = row.rowIndex
    state.cellHover.colIndex = column.columnIndex
  }

  function cellMouseLeave() {
    state.cellHover.rowIndex = undefined
    state.cellHover.colIndex = undefined
  }

</script>

<style lang="css" scoped>

/* 分頁欄 */
.card {
  text-align: center;
  position: absolute;
  top: 78px;
  width: 90%;
  max-height: 90vh;
}

/* 表格 */
.card .card-body {
  min-height: 30vh;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

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

/* 分頁欄 */
.card .card-footer {
  padding: 0;
  background-color: transparent;
}
.el-pagination {
  justify-content: center;
}

</style>