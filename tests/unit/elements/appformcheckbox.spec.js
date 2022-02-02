import AppFormCheckbox from "@/shared/elements/AppFormCheckbox.vue";
import { inputTest } from "../common/input.spec";
import { namedSlotTest } from "../common/slot.spec";
import { validationTest } from "../common/validation.spec";

describe("COMMON TEST: AppFormCheckbox.vue", () => {
  // Slot Test
  namedSlotTest(AppFormCheckbox, "inactive");
  namedSlotTest(AppFormCheckbox, "active", { props: { modelValue: true } });
  // active slot with multiple checkbox (item)
  const checkboxItems = [{ value: 'val1', label: 'Test val 1' }, { value: 'val2', label: 'val2' }];
  const selectedCheckbox = checkboxItems[1];
  namedSlotTest(AppFormCheckbox, "active", { props: { modelValue: [selectedCheckbox.value], items: checkboxItems, } });

  // Input related Test
  inputTest(AppFormCheckbox, "AppFormCheckbox.vue");

  // validation related Test
  validationTest(AppFormCheckbox, "AppFormCheckbox.vue");
});
