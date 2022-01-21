import { ref, computed } from "vue";

export default function (props, context) {  
  const focus = ref(false);
  const loading = ref(false);
  
  /** Base props for AppFormInputBase */
  const inputBaseProps = computed(() => {
    if (props && typeof props === 'object') {
      return {
        type: props?.type,
        name: props?.name,
        label: props?.label,
        labelClass: props?.labelClass,
        color: props?.color,
        error: props?.error,
        hideError: props?.hideError,
      };
    } else {
      return {};
    }
  });

  /**
   * Emits an event to update the modelValue props (intended for v-model)
   * @param {event, *} value The event/value to be emitted 
   */
  function updateModelValue(value) {
    if (!context) {
      return console.log('context argument is missing or empty');
    }
    const newVal = value?.target.value || value;
    context.emit('update:modelValue', newVal);
  }


  return {
    loading,
    focus,
    inputBaseProps,
    updateModelValue,
    defaultInputProps,
  };
}


/**
 * General props for inputs
 */
 export const defaultInputProps = {
  modelValue: { default: null },
  type: { type: String, default: 'text' },
  name: { type: String, default: '' },
  label: { type: String, default: '' },
  color: { type: String, default: 'primary' },
  labelClass: { type: String, default: '' },
  hideError: { type: Boolean, default: false },
  error: { type: String, default: '' },
}