import AppFormInputBase from "@/shared/elements/AppFormInputBase.vue";
import { inputTest } from "../common/input.spec";
import { defaultSlotTest, namedSlotTest } from "../common/slot.spec";
import { validationTest } from "../common/validation.spec";

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