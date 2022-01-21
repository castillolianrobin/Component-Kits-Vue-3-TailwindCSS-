import { shallowMount } from '@vue/test-utils'
import AppBtn from '@/shared/elements/AppBtn.vue'

describe('AppBtn.vue', () => {
  /** DEFAULT SLOT TEST */
  it('render default slot', () => {
    const defaultSlot_class = 'default-class';
    const defaultSlot_text = 'Test 1';
    const wrapper = shallowMount(AppBtn, {
      slots: {
        default: `<div class="${defaultSlot_class}">${defaultSlot_text}</div>`
      },
    })
    const defaultSlot_result = wrapper.findAll(`.${defaultSlot_class}`);
    expect(defaultSlot_result.length).toBe(1) 
    expect(defaultSlot_result[0].text()).toBe(defaultSlot_text);
  })

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