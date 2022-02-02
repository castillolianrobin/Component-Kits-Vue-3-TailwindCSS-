import { ref, watchEffect } from "vue";
import { checkPropsExist } from "../helpers/propHelper";

/**
 * Hook for initializing inputs
 *
 * @param {Object} props - input props from component
 * @param {Object} context - Context from component (needed for emitting events)
 * @returns
 */
export function useInput(props, context) {
  checkPropsExist(props, Object.keys(defaultInputProps), "useInput");

  /**
   * Emits an event to update the modelValue props (intended for v-model)
   * @param {event, *} value - The event/value to be emitted
   */
  function updateModelValue(value) {
    if (!context) {
      return console.log("context argument is missing or empty");
    }
    const newVal = value?.target ? value.target.value : value;
    context.emit("update:modelValue", newVal);
  }

  return {
    updateModelValue,
  };
}
/**
 * General props for inputs
 */
export const defaultInputProps = {
  /** Default value */
  modelValue: { default: null },
};

// export function usedInputBase(props, context) {
//   const hasError =

//   return {

//   };
// }
/**
 * General Props from inputbase.
 * Can be used for initializing the basic prop of input
 * <OR> Can be used when extending the props of AppFormInputBase
 *
 */
export const defaultInputBaseProps = {
  /** Default input property "type" */
  type: { type: String, default: "text" },
  /** Default input property "required" */
  required: { type: Boolean, default: false },
  /** Default input property "name" */
  name: { type: String, default: "" },
  /** Color for the input field on hover */
  color: { type: String, default: "primary-500" },
  /** Label of the input field */
  label: { type: String, default: "" },
  /** Additional class for label */
  labelClass: { type: String, default: "" },
  /** Removes the tag for error */
  hideError: { type: Boolean, default: false },
  /** Text to be displayed on error tag */
  error: { type: [String, Boolean], default: "" },
  /** Color on error to be displayed on error */
  errorColor: { type: String, default: "error-500" },
};

/** AppFormInputBase related logic */

/** Passes child props to the  props of AppFormInputBase
 *
 * @param {Object} props - input props from component
 * @returns {Object}
 */
export function useBaseInputProps(props) {
  checkPropsExist(
    props,
    Object.keys(defaultInputBaseProps),
    "useBaseInputProps"
  );

  const inputBaseProps = ref({});
  watchEffect(() => (inputBaseProps.value.type = props?.type));
  watchEffect(() => (inputBaseProps.value.required = props?.required));
  watchEffect(() => (inputBaseProps.value.name = props?.name));
  watchEffect(() => (inputBaseProps.value.label = props?.label));
  watchEffect(() => (inputBaseProps.value.labelClass = props?.labelClass));
  watchEffect(() => (inputBaseProps.value.error = props?.error));
  watchEffect(() => (inputBaseProps.value.hideError = props?.hideError));

  return {
    inputBaseProps,
  };
}