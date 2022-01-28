// import { mount } from "@vue/test-utils";
import AppFormInput from "@/shared/elements/AppFormInput.vue";
import { inputTest } from "../common/input.spec";
import { validationTest } from "../common/validation.spec";

// Component specific test
// describe("COMMON TEST: AppFormInputBase.vue", () => {
//   // Error Prop
//   it("render error message correctly", () => {
//     const error = 'Error Message';
//     const wrapper = mount(AppFormInput, {
//       props: {
//         error,
//       },
//     });
//     const labels = wrapper.findAll('span')
//     expect(labels).toBe(1);
//     expect(labels.length).toBe(1);
//     expect(labels[0].element.innerHTML).toBe(error);
//     expect(labels[0].element.className.includes('text-error-500')).toBe(true);
//   });

// });

// Input related Test
inputTest(AppFormInput, 'AppFormInput.vue');

// validation related Test
validationTest(AppFormInput, 'AppFormInput.vue')