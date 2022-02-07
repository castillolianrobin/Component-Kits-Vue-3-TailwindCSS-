import { shallowMount } from '@vue/test-utils'
import AppBtn from '@/common/elements/AppBtn.vue'
import { defaultSlotTest, namedSlotTest } from '../helpers/slot.spec';

const component = AppBtn;
const componentName = 'AppBtn';

describe(`COMMON TEST: ${componentName}`, () => {
  // Slot Test
  defaultSlotTest(component);
  namedSlotTest(component, 'prepend');
  namedSlotTest(component, 'append');

  /** Button */
  it('renders button correctly', () => {
    const wrapper = shallowMount(component, {
      props: {
        to: null
      }
    });
    expect(wrapper.element.tagName).toBe('BUTTON');
  })

  /** Router Link */
  it('renders router-link correctly', () => {
    const link = '/';
    const wrapper = shallowMount(component, {
      props: {
        to: link
      }
    });
    expect(wrapper.element.tagName).toBe('ROUTER-LINK');
    expect(wrapper.attributes().to).toBe(link);
  })

  /** Disabled */
  it('disable component correctly', () => {
    const wrapper = shallowMount(component, {
      props: {
        disabled: true,
      }
    })
    // await wrapper.trigger('click');
    expect(wrapper.element.disabled).toBe(true);
  })

  /** Loading */
  it('renders loading component correctly', () => {
    const wrapper = shallowMount(component, {
      props: {
        loading: true,
      }
    })
    expect(wrapper.element.disabled).toBe(true);
    expect(wrapper.find('.btn-loading').exists()).toBe(true);
  })
})