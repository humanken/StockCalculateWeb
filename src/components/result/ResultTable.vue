<template>
  <!-- 切換為中文 -->
  <el-config-provider :locale="zhTw">
    <!-- 分頁欄 -->
    <el-pagination
      v-model:current-page="state.currentPage"
      v-model:page-size="state.pageSize"
      :total="dataState.length"
      :page-sizes="[100, 200, 300, 400, 500, 1000]"
      :layout="state.layout"
    >

    </el-pagination>

    <!-- 表格資料 -->
    <el-table
        class-name="result-table"
        :data="calculateData.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize)"
        border
        @sort-change="changeTableSort"
        :cell-style="{textAlign: 'center'}"
        :cell-class-name="cellClassName"
        :header-cell-class-name="headerCellClassName"
        @cellMouseEnter="cellMouseEnter"
        @cellMouseLeave="cellMouseLeave"
    >
      <el-table-column label="名稱 (代號)" width="125" fixed="left">
        <template v-slot:default="scope">
          <a :href="scope.row.stockDividendURL" target="_blank" title="查看歷史股利分配率">
            {{ scope.row.stockFullName }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="現價" prop="stockPrice" width="100" sortable="custom"></el-table-column>
      <el-table-column label="目前殖利率" prop="averageYield" width="150" sortable="custom"></el-table-column>
      <el-table-column label="ROI" prop="roi" width="100" sortable="custom"></el-table-column>
      <el-table-column label="平均股利 (現金/股票)" prop="averageDividend" width="220"></el-table-column>

      <template v-for="i in (endYield - startYield + 1)">
        <el-table-column
            :label="(startYield + i - 1).toString() + '%'"
            :prop="'yield' + (startYield + i - 1).toString() + 'ConvertPrice'"
            width="85"
        ></el-table-column>
      </template>

    </el-table>
  </el-config-provider>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive, ref } from "vue";
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
      calculateData.data = getSingleData()
    }
    else if (props.type === 'table-all') {
      excludes.value = await getItem('excludes', [])
      await getDataAndUpdateState();
    }

    updateLayoutWithWidth();
    window.addEventListener('resize', updateLayoutWithWidth);
    // 觸發loading end，關閉Loading畫面
    loadingEmit('loadingEnd', true)
    // 緩加載
    startLazyLoadingData(6000);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateLayoutWithWidth);
  })
  // -------------------------------- State ---------------------------------------
  const state = reactive({
    currentPage: 1, pageSize: 100, layout: 'sizes, prev, pager, next, jumper, total'
  })
  
  const dataState = reactive({
     nextOffset: 0, limit: 1000, length: 0
  })
  
  function setDataState(response) {
    dataState.nextOffset = response.nextOffset
    dataState.limit = response.limit
    dataState.length = calculateData.value.length
  }

  // -------------------------------- Data ----------------------------------------
  const excludes = ref([]);
  const calculateData = ref([]);

  async function getSingleData() {
    const params = {
      numbers: history.state.params.stockNumbers,
      yieldStart: props.startYield,
      yieldEnd: props.endYield
    }
    return await getCalculateResult(params)
  }

  async function getDataAndUpdateState(timer=undefined) {
    if (timer && !dataState.nextOffset) { clearInterval(timer); return;}
    const resp = await getResponseByQuery(dataState.nextOffset, excludes.value)
    // 取得資料，去除沒有價格的資料
    calculateData.value = [...calculateData.value, ...delDataWithoutPrice(resp.data)];
    // 儲存資料狀態
    setDataState(resp);
  }

  async function getResponseByQuery(offset = 0, excludes) {
    const params = {
      skip: offset, limit: dataState.limit,
      excludes: excludes,
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
    if (window.innerWidth <= 576) { state.layout = 'prev, pager, next, total' }
    else { state.layout = 'sizes, prev, pager, next, jumper, total' }
  }

  // ---------------------------- Table Sortable -----------------------------------
  let originData = [];
  function changeTableSort(column) {
    const field = column.prop
    const sortType = column.order
    let sortData = calculateData.value

    // 儲存未排序的資料
    if (originData === []) { originData = sortData.map(item => item); }

    // 不排序，使用未排序的資料恢復原本順序
    if (!sortType) {
      calculateData.value = originData
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

    calculateData.value = sortData
  }

  // ------------------------------ Cell Hover -------------------------------------
  const hoverRowIndex = ref(undefined)
  const hoverColIndex = ref(undefined)
  function cellClassName({row, column, rowIndex, columnIndex}) {
    row.rowIndex = rowIndex
    column.columnIndex = columnIndex

    if (rowIndex === hoverRowIndex.value && columnIndex === hoverColIndex.value) {
      return 'select-row select-col'
    } else if (rowIndex === hoverRowIndex.value) {
      return 'select-row'
    } else if (columnIndex === hoverColIndex.value) {
      return 'select-col'
    }
  }

  function headerCellClassName({columnIndex}) {
    if (columnIndex === hoverColIndex.value) {
      return 'select-col'
    }
  }

  function cellMouseEnter(row, column) {
    hoverRowIndex.value = row.rowIndex
    hoverColIndex.value = column.columnIndex
  }

  function cellMouseLeave() {
    hoverRowIndex.value = undefined
    hoverColIndex.value = undefined
  }

</script>

<style lang="css" scoped>

@media (max-width: 1024px) {
  .result-table { font-size: unset; }
}
@media (min-width: 1024px){
  .result-table { font-size: 1.2rem; }
}
.result-table {
  width: 100%;
  height: 100%;
}

.result-table :deep(.el-table__header-wrapper .el-table__header th) {
  text-align: center;
  border: 0;
  background-color: #1989ff;
  color: white;
}

.result-table :deep(.el-table__header-wrapper .el-table__header th.select-col) {
  border-left: 1px solid #949966;
  border-right: 1px solid #949966;
}

.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td:hover) {
  border: 1px solid #949966;
  background-color: rgba(148, 153, 102, 0.2);
}

.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td.select-row) {
  border-top: 1px solid #949966;
  border-bottom: 1px solid #949966;
}

.result-table :deep(.el-table__body-wrapper .el-table__body .el-table__row td.select-col) {
  border-left: 1px solid #949966;
  border-right: 1px solid #949966;
}

.el-pagination {
  justify-content: center;
  margin: 0.5rem 1rem 1rem 1rem;
}

</style>