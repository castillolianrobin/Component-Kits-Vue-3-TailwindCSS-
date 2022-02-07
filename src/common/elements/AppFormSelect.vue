<template>
  <div class="relative" tabindex="0" @blur="active = false">
    <AppFormInputBase
      v-bind="inputBaseProps"
      :error="errorMessage || inputBaseProps.error"
      :required="isRequired || inputBaseProps.required"
      class="cursor-pointer"
      @click="active = !active"
    >
      <input
        class="w-full outline-none"
        readonly
        type="text"
        :value="modelValue"
        v-bind="$attrs"
      />
      <!-- Dropdown Icon slot -->
      <template v-slot:append>
        <slot v-if="active" name="active-icon">
          <ChevronUpIcon class="app-icon"></ChevronUpIcon>
        </slot>
        <slot v-else name="inactive-icon">
          <ChevronDownIcon class="app-icon"></ChevronDownIcon>
        </slot>
      </template>
      <!-- Parent Slots -->
      <template v-slot:prepend><slot name="prepend"></slot></template>
    </AppFormInputBase>

    <!-- Select Items -->
    <transition name="items">
      <div
        v-if="active"
        class="
          absolute
          top-16
          max-h-44
          w-full
          overflow-auto
          bg-gray-50
          shadow-lg
          z-50
        "
      >
        <div
          v-for="(item, index) in selectItems"
          :key="`select-item-${index}`"
          class="px-3 p-1 cursor-pointer hover:bg-gray-200 transition-colors"
          @click="updateModelValue(item.value)"
        >
          {{ item.text }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/solid";
import { computed, ref, toRefs } from "vue";
import AppFormInputBase from "./AppFormInputBase.vue";
import {
  defaultInputBaseProps,
  defaultInputProps,
  useBaseInputProps,
  useInput,
} from "../composables/useInput";
import {
  formValidationProps,
  useValidation,
  validationProps,
} from "../composables/useValidation";

export default {
  name: "AppFormSelect",
  components: { AppFormInputBase, ChevronDownIcon, ChevronUpIcon },
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    ...formValidationProps,
    items: { type: Array, default: () => [] },
  },
  setup(props, context) {
    /** useBaseInputProps Hook  */
    const { inputBaseProps } = useBaseInputProps(props);

    /** useInput Hook  */
    const { updateModelValue: _updateModelValue } = useInput(props, context);
    const useInputData = {};

    /** useValidation Hook */
    const { modelValue, validateOnChange } = toRefs(props);
    const { isRequired, checkError, errorMessage } = useValidation(
      modelValue,
      props,
      context,
      validateOnChange?.value
    );
    const useValidationData = { isRequired, checkError, errorMessage };


    /** Component State */

    // Updates the modelValue to the first value on initialization
    // const { items } = toRefs(props)
    // if (!modelValue.value && items.value.length > 0) {
    //   const firstVal = items.value[0];
    //   _updateModelValue(firstVal.value || firstVal);
    // }
    // state of the select items
    const active = ref(false);
    // items to be displayed
    const selectItems = computed(() => {
      const { items } = toRefs(props);
      return items.value.map((item) => ({
        text: item.text || item.value || item,
        value: item.value || item,
      }));
    });
    /**
     * Updates the value of the modelValue and closes the dropdown
     * @param {*} value - value to be provided
     */
    function updateModelValue(value) {
      active.value = false;
      console.log(value);
      _updateModelValue(value);
    }

    return {
      inputBaseProps,
      ...useInputData,
      ...useValidationData,
      selectItems,
      active,
      updateModelValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.items {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease, max-height 0.3s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    max-height: 0;
    // margin-top: -1.25rem;
  }
}
</style>