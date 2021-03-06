// import { mount } from "@vue/test-utils";
import AppFormInput from "@/common/elements/AppFormInput.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

const component = AppFormInput;
const componentName = 'AppFormInput';

// Component specific test
describe(`COMMON TEST: ${componentName}`, () => {
  // slot test
  namedSlotTest(component, 'prepend');
  namedSlotTest(component, 'append');
});
// Input related Test
inputTest(component, componentName);

// validation related Test
validationTest(component, componentName)