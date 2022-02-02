<template>
  <!-- Primary label -->
  <span class="mb-1 text-sm text-gray-400">{{ primaryLabel }}</span>
  <span v-if="isRequired || required" class="ml-1 text-red-500">*</span>
  <!-- Checkbox Container -->
  <div
    v-for="(item, index) in dataSet"
    :key="`checkbox-${item.value + index}`"
    @click="updateModelValue(item.value)"
    class="group flex items-center cursor-pointer"
  >
    <!-- Icon -->
    <div
      class="p-2 inline-block rounded-full transition-colors"
      :class="[`group-hover:bg-${color} group-hover:bg-opacity-30`]"
    >
      <!-- Inactive State -->
      <slot v-if="!item.isChecked" name="inactive">
        <div
          class="ring-2 ring-inset rounded-full"
          :class="[`ring-${color}`]"
        >
          <div class="app-icon-sm-semi opacity-0"></div>
        </div>
      </slot>
      <!-- Active State -->
      <slot v-else name="active">
        <div
          class="app-icon-sm-semi ring-2 ring-inset rounded-full p-1"
          :class="[`ring-${color}`]"
        >
          <div class="w-full h-full text-white rounded-full" :class="`bg-${color}`"></div>
        </div>
      </slot>
    </div>
    <!-- Label -->
    <div
      class="inline-block transition-colors"
      :class="[
        item.isChecked
          ? `text-${color} text-opacity-80 font-semibold group-hover:font-semibold`
          : ``,
        `group-hover:text-${color}`,
      ]"
    >
      <!-- Item Label -->
      <span class="text-sm select-none">{{ item.label }}</span>
    </div>
  </div>
  <!-- Error -->
  <AppFormError
    v-if="!hideError"
    sm
    :error="error || errorMessage"
    :color="errorColor"
  ></AppFormError>
</template>

<script>
import {
  defaultInputBaseProps,
  defaultInputProps,
  useInput,
} from "../composables/useInput";
import { computed, toRefs } from "@vue/reactivity";
import { useValidation, validationProps } from "../composables/useValidation";
import AppFormError from './AppFormError.vue';

export default {
  components: { AppFormError },
  name: "AppFormCheckbox",
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    primaryLabel: { type: String, default: null },
    items: { type: Array, default: () => [] },
  },
  setup(props, context) {
    /** useInput Hook  */
    const { updateModelValue: _updateModelValue } = useInput(props, context);
    const useInputData = { updateModelValue };
    
    /** useValidation Hook  */
    const { modelValue, validateOnChange } = toRefs(props);
    const { errorMessage, isRequired } = useValidation(
      modelValue,
      props,
      context,
      validateOnChange
    );
    const useValidationData = { errorMessage, isRequired };


    /**
     * Component State
     */

    /** checks whether there is a set of items to be displayed as radio button  */
    const isMultiple = computed(() => {
      return props.items.length > 0;
    });

    /**
     * Handles the data to be displayed as radio button
     * @returns {Array<Object>} Object properties: { value, label, } 
     */
    const dataSet = computed(() => {
      if (isMultiple.value) {
        return props.items.map((item) => ({
          value: item.value,
          label: item.label,
          isChecked: props.modelValue === item.value,
        }));
      } else {
        return [
          {
            value: null,
            label: props.label,
            isChecked: props.modelValue,
          },
        ];
      }
    });

    /**
     * Extends the useInput's updateModelValue
     * @param { String } value - The value to be added/removed to the modelValue
     *                          (to be used when there are multiple checkboces) 
     */
    function updateModelValue(value = null) {
      if (isMultiple.value) {
        _updateModelValue(value);
      } else {
        _updateModelValue(!props.modelValue);
      }
    }

    return {
      ...useInputData,
      ...useValidationData,
      dataSet,
      updateModelValue,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>