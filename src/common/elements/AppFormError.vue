<template>
  <span
    class="block font-light"
    :class="[`text-${color}`, { 'text-sm': sm, 'text-lg': lg }]"
  >
    <transition name="error" mode="out-in">
      <span v-if="error">
        {{ error }}
      </span>
    </transition>
    <span class="inline-block"></span>
  </span>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    error: { type: String, default: "" },
    lg: { type: Boolean, default: false },
    sm: { type: Boolean, default: false },
    color: { type: String, default: 'error-500' },
  },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.error {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease, margin 0.2s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    margin-top: -1.25rem;
  }
}
</style>