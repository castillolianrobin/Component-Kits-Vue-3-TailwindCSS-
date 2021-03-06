import AppFormInputBase from "@/common/elements/AppFormInputBase.vue";
import { inputTest } from "../helpers/input.spec";
import { defaultSlotTest, namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

const component = AppFormInputBase;
const componentName = 'AppFormInput';

// Component specific test
describe(`COMMON TEST: ${componentName}`, () => {
  // slot test
  defaultSlotTest(component);
  namedSlotTest(component, 'prepend');
  namedSlotTest(component, 'append');
});

// Input related Test
inputTest(component, componentName);

// validation related Test
validationTest(component, componentName);