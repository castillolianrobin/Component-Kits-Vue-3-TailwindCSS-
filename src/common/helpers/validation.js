/**
 * ==============================================================
 * COMMON VALIDATION CASE
 * ==============================================================
 */

/**
 * Validates that field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function required(name = '') {
  const required = (value, fieldName = name) => {
    if (!value) {
      return `${fieldName || 'This'} field shouldn't be empty.`;
    } else if (typeof value === 'object') {
      return (
        Object.keys(value).length > 0 ||
        `${fieldName || 'This'} field shouldn't be empty.`
      );
    } else if (Array.isArray(value)) {
      return (
        value.length > 0 || `${fieldName || 'This'} field shouldn't be empty.`
      );
    } else {
      return !!value || `${fieldName || 'This'} field shouldn't be empty.`;
    }
  };
  return required;
}

/**
 * Validates that field is email
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function email(name = '') {
  const email = (value, fieldName = name) => {
    return (
      /\S+@\S+\.\S+/.test(value) ||
      `${fieldName || 'This'} is not a valid email`
    );
  };
  return email;
}

/**
 * Validates if field should be number is atleast a certain number minimum
 *
 * @param min Minimum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function min(min, name = '') {
  return (value, fieldName = name) => {
    return (
      parseFloat(value) >= min ||
      `${fieldName || 'This'} field must be equal or greater than ${min}.`
    );
  };
}

/**
 * Validates if field should be number not exceed the given maximum number
 *
 * @param max Maximum number
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function max(max, name = '') {
  return (value, fieldName = name) => {
    return (
      parseFloat(value) <= max ||
      `${fieldName || 'This'} field must be equal or less than ${max}.`
    );
  };
}

/**
 * Validates if field should be atleast a certain number of character long
 *
 * @param count Number of minimum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function minLength(count, name = '') {
  return (value, fieldName = name) => {
    return (
      (value && value.length >= count) ||
      `${fieldName || 'This'} field must be atleast ${count} characters long.`
    );
  };
}

/**
 * Validates if field shouldn't exceed a certain number of character long
 *
 * @param count Number of maximum character
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function maxLength(count, name = '') {
  return (value, fieldName = name) => {
    return (
      (value && value.length < count) ||
      `${fieldName || 'This'} field must not exceed ${count} characters long.`
    );
  };
}

/**
 * ==============================================================
 * OPTIONAL VALIDATION CASES
 * ==============================================================
 */

/**
 * Validates if field should only be a number type
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function numberOnly(name = '') {
  return (value, fieldName = name) => {
    return (
      /^\d+$/.test(value) || `${fieldName || 'This'} field must be a number`
    );
  };
}

/**
 * Validates if field should only contain alphabet letters
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function alphaOnly(name = '') {
  return (value, fieldName = name) => {
    return (
      /^([A-Za-z]*)$/.test(value) ||
      `${fieldName || 'This'} field should only contain alphabet letters`
    );
  };
}

/**
 * Validates if field shouldn't have any number
 *
 * @param name name of the field
 * @returns boolean: true | string: error message
 */
export function noNumber(name = '') {
  return (value, fieldName = name) => {
    return (
      /^([^0-9]*)$/.test(value) ||
      `${fieldName || 'This'} field shouldn't have any number character`
    );
  };
}

/**
 * ==============================================================
 * SPECIAL RULE NAMING FUNCTION
 * ==============================================================
 */
// export function nameValidations(name, validations) {
//   return validations.map(validation => )
// }

/**
 * Validates that field is required
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function matchString(stringMatch, stringFieldName = '', name = '') {
  return (value, fieldName = name) => {
    return (
      value === stringMatch ||
      `${fieldName || 'This'} field should match ${
        stringFieldName || 'The string'
      }`
    );
  };
}

/**
 * Validates that field is a valid US phone number
 * Valid formats:
 *  +1 123 4567890
 *  +11234567890
 *  +1(123)4567890
 *  +1(123)456-7890
 *  +1 (123) 456-7890
 *  +1 (123)456 7890
 *  +1 123 456-7890
 *  +1 123 456 7890
 *  +1 123-456-7890
 *  123-456-7890
 *  123 456-7890
 *  123 456 7890
 *  123 4567890
 *  1234567890
 *
 * @see https://stackoverflow.com/questions/4338267/validate-phone-numberwith-javascript
 *
 * @param name Name of the field
 * @returns boolean: true | string: error message
 */
export function usPhoneNum(name = '') {
  return (value, fieldName = name) => {
    return (
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(value) ||
      `${fieldName || 'This'} field is not a valid phone number`
    );
  };
}

export default {
  required,
  email,
  min,
  max,
  minLength,
  maxLength,
  numberOnly,
  alphaOnly,
  noNumber,
  matchString,
  usPhoneNum,
};
