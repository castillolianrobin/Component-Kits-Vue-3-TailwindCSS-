import { shallowMount } from '@vue/test-utils'
import AppBtn from '@/shared/elements/AppBtn.vue'
import { defaultSlotTest, namedSlotTest } from '../common/slot.spec';

describe('COMMON TEST: AppBtn.vue', () => {
  // Slot Test
  defaultSlotTest(AppBtn);
  namedSlotTest(AppBtn, 'prepend')
  namedSlotTest(AppBtn, 'append')

  /** Button */
  it('renders button correctly', () => {
    const wrapper = shallowMount(AppBtn, {
      props: {
        to: null
      }
    });
    expect(wrapper.element.tagName).toBe('BUTTON');
  })

  /** Router Link */
  it('renders router-link correctly', () => {
    const link = '/';
    const wrapper = shallowMount(AppBtn, {
      props: {
        to: link
      }
    });
    expect(wrapper.element.tagName).toBe('ROUTER-LINK');
    expect(wrapper.attributes().to).toBe(link);
  })

  /** Disabled */
  it('disable component correctly', () => {
    const wrapper = shallowMount(AppBtn, {
      props: {
        disabled: true,
      }
    })
    // await wrapper.trigger('click');
    expect(wrapper.element.disabled).toBe(true);
  })

  /** Loading */
  it('renders loading component correctly', () => {
    const wrapper = shallowMount(AppBtn, {
      props: {
        loading: true,
      }
    })
    expect(wrapper.element.disabled).toBe(true);
    expect(wrapper.find('.btn-loading').exists()).toBe(true);
  })
})