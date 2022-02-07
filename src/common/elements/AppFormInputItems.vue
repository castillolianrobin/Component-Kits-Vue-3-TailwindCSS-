<template>
  <AppFormInputBase
    v-bind="inputBaseProps"
    :error="errorMessage || inputBaseProps.error"
    :required="isRequired || inputBaseProps.required"
  >
    <div class="flex">
      <div class="inline-flex flex-wrap mr-1">
        <div
          v-for="(item, index) in modelValue"
          :key="`app-input-item-${item}-${index}`"
          class="
            px-1
            m-0 mb-1 ml-1
            bg-gray-dark-6
            text-body-2 text-white
            bg-gray-400
            rounded
            inline-flex
            items-center
            content-center
            break-words
          "
          style="word-break: break-word"
        >
          <span>{{ item }}</span>
          <XIcon
            class="ml-1 app-icon-sm cursor-pointer hover:text-primary-300"
            @click="removeItem(index)"
          ></XIcon>
        </div>
      </div>
      <input
        type="text"
        class="outline-none flex-shrink flex-grow"
        :value="inputValue"
        v-bind="$attrs"
        @keydown="onInputKeydown"
      />
    </div>

    <!-- Parent Slots -->
    <template v-slot:append><slot name="append"></slot></template>
    <template v-slot:prepend><slot name="prepend"></slot></template>
  </AppFormInputBase>
</template>

<script>
import { XIcon } from "@heroicons/vue/solid";
import { ref, toRefs } from "vue";
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
  name: "AppFormInputItems",
  components: { AppFormInputBase, XIcon },
  props: {
    ...defaultInputProps,
    ...defaultInputBaseProps,
    ...validationProps,
    ...formValidationProps,
    /** The name of the key that triggers to add the value */
    separator: { type: String, default: "enter" },
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

    // holds the value of the input tag
    const inputValue = ref("");

    /**
     * Handles the keypress in the input tag and
     * updates the modelValue if the separator key has been pressed
     */
    function onInputKeydown(e) {
      const keyPressed = e.key.toLowerCase();
      const keySeparator = (props.separator || "").toLowerCase();
      const _value = e.target.value;
      if (keyPressed === keySeparator) {
        e.preventDefault();
        inputValue.value = "";
        updateModelValue([...modelValue.value, _value]);
      } else {
        inputValue.value = _value;
      }
    }

    /**
     * Removes item in the modelValue
     */
    function removeItem(index) {
      const _modelValue = modelValue.value;
      _modelValue.splice(index, 1);
      updateModelValue(_modelValue);
    }

    const componentState = { inputValue, onInputKeydown, removeItem };

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