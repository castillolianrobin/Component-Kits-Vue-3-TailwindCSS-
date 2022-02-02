// import { AppFormCheckBox } from '@/shared/elements/';
import AppFormRadio from "@/shared/elements/AppFormRadio.vue";
import { inputTest } from "../common/input.spec";
import { namedSlotTest } from "../common/slot.spec";
import { validationTest } from "../common/validation.spec";

describe("AppFormRadio.vue", () => {
  // Slot Test
  namedSlotTest(AppFormRadio, "inactive");
  namedSlotTest(AppFormRadio, "active", { props: { modelValue: true } });
  // active slot with multiple checkbox (item)
  const checkboxItems = [{ value: 'val1', label: 'Test val 1' }, { value: 'val2', label: 'val2' }];
  const selectedCheckbox = checkboxItems[1];
  namedSlotTest(AppFormRadio, "active", { props: { modelValue: selectedCheckbox.value, items: checkboxItems, } });

  // Input related Test
  inputTest(AppFormRadio, "AppFormRadio.vue");

  // validation related Test
  validationTest(AppFormRadio, "AppFormRadio.vue");
});
