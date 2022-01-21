<template>
  <div class="text-gray-400" :class="[`focus-within:text-${color}-600 transition-colors`]">
    <!-- Input Label -->
    <span class="text-sm">{{ label }}</span>
    <span class="ml-1 text-red-500">*</span>
    <!-- Input Container -->
    <div class="p-2 flex items-center border border-gray-400 rounded-sm" :class="[`focus-within:border-${color}-600`]">
      <!-- Prepend Slot -->
      <div class="flex-shrink">
        <slot name="prepend"></slot>
      </div>
      <!-- Default Slot -->
      <div class="pl-1 pr-1 flex-grow text-black">
        <slot>
          <input :value="modelValue" @input="updateModelValue" :type="type" :name="name" class="outline-none w-full bg-transparent">
        </slot>
      </div>
      <!-- Append Slot -->
      <div class="flex-shrink">
        <slot name="append">
        </slot>
      </div>
    </div>
    <!-- Error Message -->
    <span class="text-error-500 text-sm font-light">{{ error }}</span>
  </div>
</template>

<script>
import useInput, { defaultInputProps } from '../composables/useInput';

export default {
  props: {
    ...defaultInputProps,
  },
  
  setup (props, context) {
    const { inputBaseProps, updateModelValue } = useInput(props, context);
    const useInputData = { inputBaseProps, updateModelValue };

    return {...useInputData,};
  }
}
</script>

<style lang="scss" scoped>

</style>