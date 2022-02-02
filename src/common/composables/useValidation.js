import { computed, inject, provide, ref, toRefs, watch } from "vue";
import { getCallerName } from "../helpers/functionHelper";
import { checkPropsExist } from "../helpers/propHelper";
import validation from "../helpers/validation";

/**
 * Hook for validating input values
 *
 * @param {*} value - Value to be validated. (must be reactive)
 * @param {Object} props - Validation props from component
 * @param {Object} context - Context from component (needed for emitting events)
 * @param {Boolean} autoValidate - Whether to validate the value automatically on change
 */
export function useValidation(
  value,
  props,
  context,
  autoValidate = false /** remove autovalidate and check on the props instead */
) {
  if (value === undefined)
    return console.error(
      `useValidation: value cannot be undefined (${getCallerName()})`
    );

  if (
    !checkPropsExist(
      props,
      Object.keys(validationProps),
      "useValidation",
      "error"
    )
  ) {
    return;
  }

  const { validations, name } = toRefs(props);

  /**
   * LOCAL VARIABLE:
   *  returns all the set of validation functions based on validation props
   */
  const _validationArr = computed(() => {
    if (typeof validations.value === "string") {
      const VALIDATION_NAMES = validations.value.split("|");
      const VALIDATIONS = [];
      for (let i = 0; i < VALIDATION_NAMES.length; i++) {
        const validationName = VALIDATION_NAMES[i].trim();
        if (validationName in validation) {
          VALIDATIONS.push(validation[validationName]);
        } else if (validationName) {
          console.error(
            `useValidation: Unknown validation "${validationName}"`
          );
          return [];
        }
      }
      return VALIDATIONS;
    } else if (Array.isArray(validations.value)) {
      return validations.value;
    } else {
      return [];
    }
  });

  /**
   * Returns whether there is "required" validation on the validations property
   */
  const isRequired = computed(() => {
    if (typeof _validationArr.value === "string") {
      return _validationArr.value.split("|").includes("required");
    } else {
      return (
        _validationArr.value.filter((rule) => {
          if (typeof rule() === "function") {
            let innerRule = rule("");
            return innerRule("").toString().includes("shouldn't be empty.");
          } else {
            return rule("").toString().includes("shouldn't be empty.");
          }
        }).length > 0
      );
    }
  });

  /**
   * Validates the given value based on the set of validation props
   * @returns {Boolean, String} returns the error message of the validation else return false
   */
  function validateValue(val) {
    const rules = _validationArr.value;
    const _value = val;
    const _name = name.value;
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      let validate = false;
      if (typeof rule() === "function") {
        let innerRule = rule();
        validate = _name ? innerRule(_value, _name) : innerRule(_value);
      } else {
        validate = _name ? rule(_value, _name) : rule(_value);
      }
      if (validate !== true) {
        return validate;
      }
    }
    return false;
  }

  const errorMessage = ref("");
  /**
   * Checks for error and update the errorMessage's value accordingly
   * @param {*} val - Value to be checked
   */
  function checkError(val = false) {
    const _val =
      val === false ? value.value : val?.target ? val.target.value : val;

    return (errorMessage.value = validateValue(_val) || "");
  }

  /** if true, activates error checking upon value change  */
  if (autoValidate) {
    watch(value, () => checkError(value.value));
  }

  /**
   * Emits an event to update the valid props (intended for v-model)
   * @param {Boolean} value the value to be emitted
   */
  function updateValid(value) {
    if (!context) {
      return console.log("context argument is missing or empty");
    }
    context.emit("update:valid", value);
  }

  /**
   * This script utilizes the initForm() hook's logic
   * Adds validation via initForm()'s providers
   */
  const formValidationKey = inject("formValidationKey", false);
  if (props?.validateByForm && formValidationKey !== false) {
    const formAddInput = inject("formAddInput", () => {});
    const formAddValidInput = inject("formAddValidInput", () => {});
    const formAddError = inject("formAddError", () => {});
    formAddInput();
    watch(formValidationKey, () => {
      checkError(value.value);
      errorMessage.value && formAddError(errorMessage.value);
      formAddValidInput();
    });
  }

  return {
    isRequired,
    validateValue,
    checkError,
    errorMessage,
    updateValid,
  };
}

export const validationProps = {
  /** List of validation to be checked */
  validations: { type: [Array, String], default: () => [] },
  /** Reserved prop for AppForm.vue */
  validate: { type: [Number, String, Boolean], default: false },
  /** Prop for checking if input is valid */
  valid: { type: Boolean, default: false },
  /** Flag whether to activate the validation on value changue */
  validateOnChange: { type: Boolean, default: false },
  /** Name of the input field ( will be used as label for displaying error ) */
  name: { type: String, default: null },
};

export { validation as validation };

/********************************
 * FORM SPECIFIC HOOKS AND LOGICS
 *******************************/

/**
 * Initalizes the form component to be used for validating input components.
 * The useValidation() hook has script intended to utilize this hook
 *
 * @param {Object} context context from component (needed for emitting events)
 * @returns {Object}
 */
export function initForm(context) {
  /** List of Errors */
  const errors = ref([]);
  /**
   * @param {String} error
   */
  function addError(error) {
    errors.value.push(error);
  }
  function resetError() {
    errors.value = [];
  }
  /**
   * Provider for inputs:
   * Add error caught by inputs upon form validation
   */
  provide("formAddError", addError);

  /** Number of inputs included in the checking */
  const inputCtr = ref(0);
  function addInput() {
    inputCtr.value += 1;
  }
  /**
   * Provider for inputs:
   * Grants input to be included in the validation
   */
  provide("formAddInput", addInput);

  /** Number of inputs validated upon checking */
  const validInputCtr = ref(0);
  function addValidInput() {
    validInputCtr.value += 1;
  }
  /**
   * Provider for inputs:
   * Flags the form that an input has been validated
   */
  provide("formAddValidInput", addValidInput);

  /**
   * watch if number of inputs validated is equal to inputs included,
   */
  watch(validInputCtr, () => {
    if (inputCtr.value === validInputCtr.value) {
      context.emit("validated", errors);
    }
  });

  /**
   * Validation key:
   * Sends the flag for the input to activate validation
   */
  const validationKey = ref("");
  /**
   * Provider for inputs:
   * Will be watched by input to activate validation
   */
  provide("formValidationKey", validationKey);
  function startFormValidation() {
    resetError();
    validInputCtr.value = 0;
    validationKey.value = `val-key-${Math.random() * 10}`;
  }

  return {
    errors,
    inputCtr,
    validInputCtr,
    validationKey,
    startFormValidation,
  };
}
/** Props for form validation*/
export const formValidationProps = {
  validateByForm: { type: Boolean, default: false },
};
