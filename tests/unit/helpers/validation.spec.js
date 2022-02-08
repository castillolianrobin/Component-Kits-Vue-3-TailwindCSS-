import { mount } from "@vue/test-utils";
import { required } from "@/common/helpers/validation";

export const validationTest = (component, name, options) => {
  describe(`VALIDATION TEST: ${name}`, () => {

    // Required validation
    it("renders required label correctly", () => {
      const wrapper = mount(component, {
        props: {
          validations: 'required',
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML === "*");

      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe("*");
      expect(labels[0].element.className.includes('text-red-500')).toBe(true);
    });
    it("validate required properly", async () => {
      const validation = required();
      const validationMessage = validation();
      const wrapper = mount(component, {
        props: {
          validations: 'required',
          validateOnChange: true,
          modelValue: 'test',
          ...options,
        }
      });

      await wrapper.setProps({ modelValue: null })
      
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML === validationMessage)
      
      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe(validationMessage);
    })
  });

  // try all validations if possible
}