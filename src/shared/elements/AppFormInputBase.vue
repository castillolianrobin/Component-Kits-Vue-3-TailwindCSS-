<template>
  <div
    class="text-gray-400"
    :class="[`focus-within:text-${color}-600 transition-colors`]"
  >
    <!-- Input Label -->
    <span class="text-sm">{{ label }}</span>
    <span v-if="isRequired || required" class="ml-1 text-red-500">*</span>

    <!-- Input Container -->
    <div
      class="p-2 flex items-center border border-gray-400 rounded-sm"
      :class="[`focus-within:border-${color}-600`]"
    >
      <!-- Prepend Slot -->
      <div class="flex-shrink">
        <slot name="prepend"></slot>
      </div>
      <!-- Default Slot -->
      <div class="pl-1 pr-1 flex-grow text-black">
        <slot>
          <input
            class="outline-none w-full bg-transparent"
            :value="modelValue"
            :type="type"
            :name="name"
            @input="updateModelValue"
            @blur="checkError"
            v-bind="$attrs"
          />
        </slot>
      </div>
      <!-- Append Slot -->
      <div class="flex-shrink">
        <slot name="append"> </slot>
      </div>
    </div>
    <!-- Error Message -->
    <span class="text-error-500 text-sm font-light">{{
      errorMessage || error
    }}</span>
  </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { useInput, defaultInputProps } from "../composables/useInput";
import {
  formValidationProps,
  useValidation,
  validationProps,
} from "../composables/useValidation";

export default {
  props: {
    ...defaultInputProps,
    ...validationProps,
    ...formValidationProps,
  },

  setup(props, context) {
    /** useInput Hook  */
    const { inputBaseProps, updateModelValue } = useInput(props, context);
    const useInputData = { inputBaseProps, updateModelValue };

    /** useValidation Hook */
    const { modelValue, validateOnChange } = toRefs(props);
    const { isRequired, checkError, errorMessage } = useValidation(
      modelValue,
      props,
      context,
      validateOnChange
    );
    const useValidationData = { isRequired, checkError, errorMessage };

    return {
      ...useInputData,
      ...useValidationData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>