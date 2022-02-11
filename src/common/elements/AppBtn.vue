<template>
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :disabled="disabled || loading"
    class="p-2 relative border-2 rounded uppercase"
    :class="[
        `border-${color}`,
        disabled || loading 
          ? `opacity-60` 
          : `hover:bg-opacity-80 hover:border-opacity-0 transition`,
        outline
          ? `text-${textColor || color} ` + (!disabled && !loading && `hover:text-white hover:bg-${color}`)
          : `bg-${color} text-${ textColor || (color === 'white' ? 'black' : 'white')}`,
        {
          'text-xl rounded-lg':lg,
          'text-xs rounded-sm':sm,
        }
      ]"
    v-bind="$attrs"
  >
    <!-- Loading Content -->
    <div v-if="loading" class="btn-loading flex left-0 absolute w-full">
      <AppLoading class="m-auto" :color="outline ?  '#cccccc' : '#ffffff'" :height="lg ? 36 : sm ? 18 : 24"></AppLoading>
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
    textColor: { type: String, default: null },
    color: { type: String, default: 'primary-500' },
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