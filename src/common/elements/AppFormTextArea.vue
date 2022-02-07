<template>
  <AppFormInputBase
    v-bind="inputBaseProps"
    :error="errorMessage || inputBaseProps.error"
    :required="isRequired || inputBaseProps.required"
  >
    <!-- Input Element -->
    <textarea
      class="w-full outline-none"
      :value="modelValue"
      @input="updateModelValue"
      @blur="checkError"
      v-bind="$attrs"
      :style="{ minHeight }"
    />
    <!-- Shadow text area element -->
    <textarea
      ref="textAreaHeightReference"
      :value="modelValue"
      class=" absolute max-h-0 pointer-events-none opacity-0 m-0"
    />
    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </AppFormInputBase>
</template>

<script>
import { ref, toRefs, watch } from "vue";
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
  name: "AppFormTextArea",
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


    /** Component State */

    // auto height logic for text area
    // minimum height for the text area
    const minHeight = ref(0);
    // refs for hidden text area that computes the height
    const textAreaHeightReference = ref(null);

    watch(modelValue, () => { 
      minHeight.value = `${textAreaHeightReference.value.scrollHeight}px`;
    });
    
    const componentState = { textAreaHeightReference, minHeight };

    return {
      inputBaseProps,
      ...useInputData,
      ...useValidationData,
      ...componentState,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>