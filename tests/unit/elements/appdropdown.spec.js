import AppDropdown from '@/common/elements/AppDropdown.vue'
import { defaultSlotTest, namedSlotTest } from '../helpers/slot.spec';

const component = AppDropdown;
const componentName = 'AppDropdown';

describe(`COMMON TEST: ${componentName}`, () => {
  // Slot Test
  defaultSlotTest(component);
  namedSlotTest(component, 'activator');
  // namedSlotTest(component, 'append');

})