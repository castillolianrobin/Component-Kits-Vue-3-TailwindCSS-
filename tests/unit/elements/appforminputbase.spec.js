import { shallowMount } from "@vue/test-utils";
import AppFormInputBase from "@/shared/elements/AppFormInputBase.vue";
import { inputTest } from "../common/input.spec";
import { validationTest } from "../common/validation.spec";

// Component specific test
describe("commont test: AppFormInputBase.vue", () => {
  /** DEFAULT SLOT TEST */
  it("render default slot", () => {
    const defaultSlot_class = "default-class";
    const defaultSlot_text = "Test 1";
    const wrapper = shallowMount(AppFormInputBase, {
      slots: {
        default: `<div class="${defaultSlot_class}">${defaultSlot_text}</div>`,
      },
    });
    const defaultSlot_result = wrapper.findAll(`.${defaultSlot_class}`);
    expect(defaultSlot_result.length).toBe(1);
    expect(defaultSlot_result[0].text()).toBe(defaultSlot_text);
  });
});

// Input related Test
inputTest(AppFormInputBase, 'AppFormInputBase.vue');

// validation related Test
validationTest(AppFormInputBase, 'AppFormInputBase.vue')