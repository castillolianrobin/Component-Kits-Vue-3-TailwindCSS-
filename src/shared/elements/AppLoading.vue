<template>
  <loading active loader="bars"  color="white" opacity="0" :is-full-page="false" v-bind="$attrs"></loading>
</template>

<script>
import Loading from 'vue-loading-overlay';
export default {
  components: {
    Loading,
  },
}
</script>

<style lang="scss" scoped>
// @import url();
</style>