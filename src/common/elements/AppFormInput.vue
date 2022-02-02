<template>
  <AppFormInputBase
    v-bind="inputBaseProps"
    :error="errorMessage || inputBaseProps.error"
    :required="isRequired || inputBaseProps.required"
  >
    <input
      class="w-full outline-none"
      :value="modelValue"
      :type="type"
      @input="updateModelValue"
      @blur="checkError"
      v-bind="$attrs"
    />
    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </AppFormInputBase>
</template>

<script>
import { toRefs } from "vue";
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

export default {
  name: "AppFormInput",
  components: { AppFormInputBase },
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    ...formValidationProps,
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

    return {
      inputBaseProps,
      ...useInputData,
      ...useValidationData,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>