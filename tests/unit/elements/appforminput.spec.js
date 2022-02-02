// import { mount } from "@vue/test-utils";
import AppFormInput from "@/common/elements/AppFormInput.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

// Component specific test
describe("COMMON TEST: AppFormInput.vue", () => {
  // slot test
  namedSlotTest(AppFormInput, 'prepend');
  namedSlotTest(AppFormInput, 'append');
});
// Input related Test
inputTest(AppFormInput, 'AppFormInput.vue');

// validation related Test
validationTest(AppFormInput, 'AppFormInput.vue')