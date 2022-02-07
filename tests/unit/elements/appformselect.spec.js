// import { mount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import AppFormSelect from "@/common/elements/AppFormSelect.vue";
import { inputTest } from "../helpers/input.spec";
import { namedSlotTest } from "../helpers/slot.spec";
import { validationTest } from "../helpers/validation.spec";

const component = AppFormSelect;
const componentName = 'AppFormSelect';

// Component specific test
describe(`COMMON TEST: ${componentName}`, () => {
  // slot test
  namedSlotTest(component, 'prepend');
  namedSlotTest(component, 'inactive-icon');
  it(`renders 'active-icon' slot`, async () => {
    const namedSlot_class = 'slot-class';
    const namedSlot_text = 'Test 1';
    const wrapper = mount(component, {
      slots: {
        'active-icon': `<div class="${namedSlot_class}">${namedSlot_text}</div>`
      }
    });

    await (wrapper.vm.active = true);
    const defaultSlot_result = wrapper.findAll(`.${namedSlot_class}`);
    expect(defaultSlot_result.length).toBe(1) 
    expect(defaultSlot_result[0].text()).toBe(namedSlot_text);
  })
});

// Input related Test
inputTest(component, componentName);

// validation related Test
validationTest(component, componentName)