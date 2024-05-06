<template>
  <table class="table table-borderless align-middle">
    <tbody>
      <tr v-if="type === 'twse'" v-for="n in row">
        <td v-for="cat in catList.slice((n - 1) * col, n * col)">
          <div class="form-check category-checkbox">
            <input
                class="form-check-input"
                :id="cat.name"
                type="checkbox"
                :value="cat.sector_id"
                @click="$emit('checkboxClick', cat.sector_id)"
                :checked="!excludes.includes(cat.sector_id)">
            <label class="form-check-label" :for="cat.name">{{cat.name}}</label>
          </div>
        </td>
      </tr>

      <tr v-for="n in row" v-else>
        <td v-for="cat in catList.slice((n - 1) * col, n * col)">
          <div class="form-check category-checkbox">
            <input
                class="form-check-input"
                :id="cat.name"
                type="checkbox"
                :value="cat.sector_id"
                @click="$emit('checkboxClick', cat.sector_id)"
                :checked="!excludes.includes(cat.sector_id)">
            <label class="form-check-label" :for="cat.name">{{cat.name}}</label>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>

  defineProps({
    'type': {required: true},
    'excludes': {required: false, default: []},
    'col': {required: true}, 'row': {required: true},
    'catList': {required: true}
  })

</script>

<style scoped>
table {
  margin: 0;
}
</style>