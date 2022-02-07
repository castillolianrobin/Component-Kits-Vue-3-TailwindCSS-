// import { AppFormCheckBox } from '@/shared/elements/';
import AppFormRadio from "@/common/elements/AppFormRadio.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

const component = AppFormRadio;
const componentName = 'AppFormRadio';

describe(`COMMON TEST: ${componentName}`, () => {
  // Slot Test
  namedSlotTest(component, 'inactive');
  namedSlotTest(component, 'active', { props: { modelValue: true } });
  // active slot with multiple checkbox (item)
  const checkboxItems = [{ value: 'val1', label: 'Test val 1' }, { value: 'val2', label: 'val2' }];
  const selectedCheckbox = checkboxItems[1];
  namedSlotTest(component, 'active', { props: { modelValue: selectedCheckbox.value, items: checkboxItems, } });

  // Input related Test
  inputTest(component, componentName);

  // validation related Test
  validationTest(component, componentName);
});
