<template>
  <div
    class="p-1 bg-white"
    :class="{
      'hover:shadow-lg transition-shadow': hoverable,
      'shadow-none': noShadow,
      shadow: !noShadow,
    }"
  >
    <h1
      class="card-header text-sm font-semibold mb-1"
      :class="`text-${headerColor}`"
    >
      <slot name="header">{{ header }}</slot>
    </h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppCard",
  props: {
    noShadow: { type: Boolean, default: false },
    header: { type: String, default: "" },
    headerColor: { type: String, default: 'primary-500' },
    hoverable: { type: Boolean, default: false },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>