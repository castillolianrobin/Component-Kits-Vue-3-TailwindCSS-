<template>
  <AppFormInputBase
    v-bind="inputBaseProps"
    :error="errorMessage || inputBaseProps.error"
    :required="isRequired || inputBaseProps.required"
  >
    <!-- Input Element -->
    <DatePicker
      v-bind="$attrs"
      class="w-100 border-none outline-none"
      :value="modelValue"
      @onChange="updateModelValue"
    />
    
    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </AppFormInputBase>
</template>

<script>
import AppFormInputBase from "./AppFormInputBase.vue";
import {
  useInput,
  useBaseInputProps,
  defaultInputProps,
  defaultInputBaseProps,
} from "../composables/useInput";
import {
  formValidationProps,
  useValidation,
  validationProps,
} from "../composables/useValidation";
import { toRefs } from '@vue/reactivity';
import DatePicker from "vue3-date-time-picker";
// import { DateTime } from 'luxon';

export default {
  name: "AppFormInputDate",
  components: { AppFormInputBase, DatePicker },
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    ...formValidationProps,
    /** Hides the time in the picker */
    // noTime: { type: Boolean, default: false },
    // minToday: { type: Boolean, default: false },
  },
  setup(props, context) {
    /** useBaseInputProps Hook  */
    const { inputBaseProps } = useBaseInputProps(props);

    /** useInput Hook  */
    const { updateModelValue } = useInput(props, context);
    const useInputData = { updateModelValue };

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
    // const today = ref(DateTime.now());
    
    function notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    }

    const componentState = { notBeforeToday };

    return {
      inputBaseProps,
      ...useInputData,
      ...useValidationData,
      ...componentState,
    };
  },
};
</script>

<style lang="scss">
@import 'vue3-date-time-picker/src/Vue3DatePicker/style/main.scss';

.dp__theme_light {
  --dp-border-color: transparent;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: transparent;
}
</style>