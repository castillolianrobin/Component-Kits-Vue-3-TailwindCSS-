import { mount } from "@vue/test-utils";

/** DEFAULT SLOT TEST */
export const defaultSlotTest = (component, options = {}) => {  
  it('renders default slot', () => {
    const defaultSlot_class = 'default-class';
    const defaultSlot_text = 'Test 1';
    const wrapper = mount(component, {
      slots: {
        default: `<div class="${defaultSlot_class}">${defaultSlot_text}</div>`
      },
      ...options,
    })
    const defaultSlot_result = wrapper.findAll(`.${defaultSlot_class}`);
    expect(defaultSlot_result.length).toBe(1) 
    expect(defaultSlot_result[0].text()).toBe(defaultSlot_text);
  })
}

/** NAMED SLOT TEST */
export const namedSlotTest = (component, slotName, options = {}) => {  
  it(`renders '${slotName}' slot`, () => {
    const namedSlot_class = 'slot-class';
    const namedSlot_text = 'Test 1';
    const wrapper = mount(component, {
      slots: {
        [slotName]: `<div class="${namedSlot_class}">${namedSlot_text}</div>`
      },
      ...options,
    })
    const defaultSlot_result = wrapper.findAll(`.${namedSlot_class}`);
    expect(defaultSlot_result.length).toBe(1) 
    expect(defaultSlot_result[0].text()).toBe(namedSlot_text);
  })
}