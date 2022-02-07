import { mount } from "@vue/test-utils";

export const inputTest = (component, name) => {
  describe(`INPUT TEST: ${name}`, () => {
    // Label Prop
    it("render labels correctly", () => {
      const label = "Test Label";
      const wrapper = mount(component, {
        props: {
          label,
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML === label)
        .map(element => element.element.innerHTML);
      expect(labels.length).toBe(1);
      expect(labels[0]).toBe(label);
    });

    // Required Prop
    it("render required label correctly", () => {
      const wrapper = mount(component, {
        props: {
          required: true,
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML === "*");

      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe("*");
      expect(labels[0].element.className.includes('text-red-500')).toBe(true);
    });

    // Error Prop
    it("render error message correctly", () => {
      const error = 'Error Message';
      const wrapper = mount(component, {
        props: {
          error,
        },
      });
      const labels = wrapper
        .findAll("span")
        .filter(element => element.element.innerHTML === error)

      expect(labels.length).toBe(1);
      expect(labels[0].element.innerHTML).toBe(error);
    });
  });
}