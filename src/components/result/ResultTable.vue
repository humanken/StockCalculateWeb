<template>

  <el-table
      class-name="result-table"
      :data="calculateData"
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

</template>

<script setup>
  import { onMounted, reactive, ref } from "vue";
  import {getCalculateResult, getQueryCalculateResult} from "@/server/calculate.js";
  import {getItem} from "@/server/localStorage.js";

  const props = defineProps({
    type: { required: true },
    startYield: { required: false, type: Number, default: 2 },
    endYield: { required: false, type: Number, default: 8 }
  })

  const loadingEmit = defineEmits()
  let calculateData = reactive([]);

  onMounted(async function () {

    const data = await getDataByType();
    // 加入資料到calculateData，除了沒有價格的資料
    addDataExceptNoPrice(data)

    // 觸發loading end，關閉Loading畫面
    loadingEmit('loadingEnd', true)
  })

  // -------------------------------- Data ----------------------------------------
  let copyCalculateResult = [];
  
  async function getDataByType() {
    if (props.type === 'table-single') {
      const params = {
        numbers: history.state.params.stockNumbers,
        yieldStart: props.startYield,
        yieldEnd: props.endYield
      }
      return await getCalculateResult(params)
    }
    else if (props.type === 'table-all') {
      const excludes = await getItem('excludes', [])
      const params = {
        skip: 0, limit: 50,
        excludes: excludes,
        yieldStart: props.startYield,
        yieldEnd: props.endYield
      }
      console.log('params: ', params)
      return await getQueryCalculateResult(params)
    }
  }

  function addDataExceptNoPrice(data) {
    data.forEach(item => {
      if (!item.stockPrice) { return }
      calculateData.push(item)
      copyCalculateResult.push(item);
    })
  }
  // ---------------------------- Table Sortable -----------------------------------
  function changeTableSort(column) {
    const field = column.prop
    const sortType = column.order

    if (!sortType) {
      copyCalculateResult.forEach((item, i) => calculateData[i] = item);
      return
    }

    // string 轉成 float
    if (['averageYield', 'roi'].includes(field)) {
      calculateData.map(item => {
        item[field] = item[field].replace('%', '')
      })
    }

    if (sortType === 'descending') {
      calculateData = calculateData.sort((a, b) => b[field] - a[field])
    } else {
      calculateData = calculateData.sort((a, b) => a[field] - b[field])
    }

    // float 轉成 string
    if (['averageYield', 'roi'].includes(field)) {
      calculateData.map(item => { item[field] = `${item[field]}%` });
    }
    console.log('table data: ', calculateData)
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

</style>