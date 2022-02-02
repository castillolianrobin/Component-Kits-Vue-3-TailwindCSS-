<template>
  <form
    ref="appForm"
    @submit.prevent="startFormValidation"
    enctype="multipart/form-data"
  >
    <slot :errors="errors"></slot>
  </form>
</template>

<script>
import { watch } from "vue";
import { initForm } from "../composables/useValidation";

export default {
  name: "AppForm",
  props: {
    modelValue: { type: Boolean, default: false },
  },

  setup(props, context) {
    
    /** useValidation hook */
    const {
      errors,
      inputCtr,
      validInputCtr,
      startFormValidation,
    } = initForm(context);
        
    /** Component script */
    function updateModelValue(value) {
      context.emit("update:modelValue", value);
    }
    watch(validInputCtr, () => {
      if (inputCtr.value === validInputCtr.value) {
        updateModelValue(errors.value.length === 0);
      }
    });

    return {
      errors,
      startFormValidation,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>