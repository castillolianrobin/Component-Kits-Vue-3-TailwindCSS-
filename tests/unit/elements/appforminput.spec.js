// import { mount } from "@vue/test-utils";
import AppFormInput from "@/shared/elements/AppFormInput.vue";
import { inputTest } from "../common/input.spec";
import { namedSlotTest } from "../common/slot.spec";
import { validationTest } from "../common/validation.spec";

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