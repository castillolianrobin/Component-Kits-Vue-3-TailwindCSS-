// import { AppFormCheckBox } from '@/shared/elements/';
import AppFormCheckBox from "@/shared/elements/AppFormCheckBox.vue";
import { inputTest } from "../common/input.spec";
import { namedSlotTest } from "../common/slot.spec";
import { validationTest } from "../common/validation.spec";

describe("AppFormCheckBox.vue", () => {
  // Slot Test
  namedSlotTest(AppFormCheckBox, "inactive");
  namedSlotTest(AppFormCheckBox, "active", { props: { modelValue: true } });
  // active slot with multiple checkbox (item)
  const checkboxItems = [{ value: 'val1', label: 'Test val 1' }, { value: 'val2', label: 'val2' }];
  const selectedCheckbox = checkboxItems[1];
  namedSlotTest(AppFormCheckBox, "active", { props: { modelValue: [selectedCheckbox.value], items: checkboxItems, } });

  // Input related Test
  inputTest(AppFormCheckBox, "AppFormCheckBox.vue");

  // validation related Test
  validationTest(AppFormCheckBox, "AppFormCheckBox.vue");
});
