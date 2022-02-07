r<template>
  <AppFormInputBase
    v-bind="inputBaseProps"
    :error="errorMessage || inputBaseProps.error"
    :required="isRequired || inputBaseProps.required"
  >
    <input
      class="w-full outline-none"
      :value="decimalValue"
      :type="type"
      @input="onInputChange"
      @blur="checkError"
      v-bind="$attrs"
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
  name: "AppFormInput",
  components: { AppFormInputBase },
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    ...formValidationProps,
    valueType: {
      type: String,
      default: "number",
      validator: (val) => ["number", "decimal"].includes(val),
    },
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

    // value of the input element
    const decimalValue = ref(numbertoDecimal(modelValue.value));
    // handles the onChange event of the input element
    function onInputChange(e) {
      const _value = e.target.value;
      decimalValue.value = e.target.value;
      decimalValue.value = numbertoDecimal(_value);
      
      const { valueType } = toRefs(props);
      if (valueType === 'number') {
        updateModelValue(decimalToNumber(decimalValue.value));
      } else {
        updateModelValue(decimalValue.value);
      }
    }
    // watch modelValue change and update the value of the input to it's decimal form
    watch(modelValue, (val) => {
      decimalValue.value = numbertoDecimal(val);
    })


    // conversion functions

    /**
     * Converts String number to decimal
     * @param {String, Number} val Value that holds the number to be converted and filtered to decimal
     * @returns {String}
     */
    function numbertoDecimal(val) {
      if (isNaN(parseFloat(val)) || !val) {
        return 0;
      } else {
        // filters non decimal characters
        let _numVal = parseFloat(val.toString().replace(/,/g, ""));
        // the actual decimal value
        let _decimalString = _numVal.toLocaleString("en");
        // get decimal position
        const decimalPos = val.indexOf(".");
        if (decimalPos >= 0) {
          const decimalLength = val.substring(decimalPos).length - 1;
          if (decimalLength > 0) {
            _decimalString = _numVal.toLocaleString("en", {
              minimumFractionDigits: decimalLength < 6 ? decimalLength || 1 : 6,
              maximumFractionDigits: 6,
            });
          } else {
            _decimalString = `${_decimalString}.`;
          }
        }
        return _decimalString;
      }
    }

    /**
    * Converts String decimal to number
    * @param {String} val Value that holds the decimal to be converted and filtered to number
    * @returns {Number}
    */
    function decimalToNumber(val) {
      let _numVal = parseFloat(val.toString().replace(/,/g, ""));
      if (isNaN(_numVal)) {
        return 0;
      } else {
        return _numVal;
      }
    }

    const componentState = {
      decimalValue,
      onInputChange,
    };

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