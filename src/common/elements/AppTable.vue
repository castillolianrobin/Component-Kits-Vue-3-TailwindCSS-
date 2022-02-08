<template>
  <div>

  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  props: {
    headers: { type: Array, default: () => [] },
    hoverable: { type: Boolean, default: false },
    items: { type: Array, default: () => [] },
    itemsPerPage: { type: [String, Number], default: 10 },
    total: { type: [String, Number], default: 0 },
    currentPage: { type: [String, Number], default: 0 },
    paginationClass: { type: String, default: '' },
    paginationHideDetail: { type: Boolean, default: false },
    centerPagination: { type: Boolean, default: false },
  },

  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>