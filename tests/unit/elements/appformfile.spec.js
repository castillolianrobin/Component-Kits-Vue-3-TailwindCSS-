// import { mount } from "@vue/test-utils";
import AppFormFile from "@/common/elements/AppFormFile.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

const component = AppFormFile;
const componentName = 'AppFormFile';

// Component specific test
describe(`COMMON TEST: ${componentName}`, () => {
  // slot test
  namedSlotTest(component, 'dropzone-template');
  // namedSlotTest(component, 'append');
});
// Input related Test
inputTest(component, componentName);

// validation related Test
validationTest(component, componentName)