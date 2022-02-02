import AppFormInputBase from "@/common/elements/AppFormInputBase.vue";
import { inputTest } from "../helpers/input.spec";
import { defaultSlotTest, namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

// Component specific test
describe("COMMON TEST: AppFormInputBase.vue", () => {
  // slot test
  defaultSlotTest(AppFormInputBase);
  namedSlotTest(AppFormInputBase, 'prepend');
  namedSlotTest(AppFormInputBase, 'append');
});

// Input related Test
inputTest(AppFormInputBase, 'AppFormInputBase.vue');

// validation related Test
validationTest(AppFormInputBase, 'AppFormInputBase.vue')