<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :disabled="disabled || loading"
    class="p-2 relative border-2 rounded uppercase"
    :class="[
        disabled || loading 
          ? `border-${color}-300` 
          : `border-${color}-500 hover:border-${color}-600 hover:bg-${color}-600 transition-colors`,
        outline 
          ? disabled || loading ? `text-${color}-300` : `text-${color}-500 hover:text-white`
          : (disabled|| loading ? `bg-${color}-300` : `bg-${color}-500`) + ' text-white' ,
        {
          'text-xl rounded-lg':lg,
          'text-xs rounded-sm':sm,
        }
      ]"
    v-bind="$attrs"
  >
    <!-- Loading Content -->
    <div v-if="loading" class="flex  absolute btn-loading w-full">
      <AppLoading class="m-auto" :color="outline ?  '#cccccc' : '#ffffff'" :height="lg ? '2rem' : sm ? '1rem' : '1.5rem'"></AppLoading>
    </div>

    <!-- Main Content -->
    <div :class="{ 'opacity-0': loading }">
      <div class="inline-block align-middle">
        <slot name="prepend"></slot>
      </div>
      <slot></slot>
      <div class="inline-block align-middle">
        <slot name="append"></slot>
      </div>
    </div>
  </component>
</template>

<script>
import AppLoading from './AppLoading.vue'
export default {
  components: { AppLoading },
  name: 'AppBtn',
  props: {
    to: { type: [String, Object], default: null },
    sm: { type: Boolean, default: false },
    lg: { type: Boolean, default: false },
    outline: { type: Boolean, default: false },
    text: { type: Boolean, default: false },
    color: { type: String, default: 'primary' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    prependIcon: { type: String, default: '' },
    appendIcon: { type: String, default: '' },
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>