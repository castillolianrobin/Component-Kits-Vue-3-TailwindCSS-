// import { AppFormCheckBox } from '@/shared/elements/';
import AppFormRadio from "@/common/elements/AppFormRadio.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

describe("AppFormRadio.vue", () => {
  // Slot Test
  namedSlotTest(AppFormRadio, 'inactive');
  namedSlotTest(AppFormRadio, 'active', { props: { modelValue: true } });
  // active slot with multiple checkbox (item)
  const checkboxItems = [{ value: 'val1', label: 'Test val 1' }, { value: 'val2', label: 'val2' }];
  const selectedCheckbox = checkboxItems[1];
  namedSlotTest(AppFormRadio, 'active', { props: { modelValue: selectedCheckbox.value, items: checkboxItems, } });

  // Input related Test
  inputTest(AppFormRadio, "AppFormRadio.vue");

  // validation related Test
  validationTest(AppFormRadio, "AppFormRadio.vue");
});
