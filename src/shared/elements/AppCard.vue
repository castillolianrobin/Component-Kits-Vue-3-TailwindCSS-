<template>
  <div
    class="p-1"
    :class="{
      'hover:shadow-lg transition-shadow': hoverable,
      'shadow-none': noShadow,
      'shadow': !noShadow,
    }"
  > 
    <h1 class="card-header text-xl font-semibold uppercase mb-1"><slot name="header">{{ header }}</slot></h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    noShadow: { type: Boolean, default: false },
    header: { type: String, default: '' },
    hoverable: { type: Boolean, default: false },
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>