import { shallowMount } from '@vue/test-utils'
import AppCard from '@/shared/elements/AppCard.vue'

describe('AppCard.vue', () => {
  
  /** DEFAULT SLOT TEST */
  it('render default slot', () => {
    const defaultSlot_class = 'default-class';
    const defaultSlot_text = 'Test 1';
    const wrapper = shallowMount(AppCard, {
      slots: {
        default: `<div class="${defaultSlot_class}">${defaultSlot_text}</div>`
      },
    })
    const defaultSlot_result = wrapper.findAll(`.${defaultSlot_class}`);
    expect(defaultSlot_result.length).toBe(1) 
    expect(defaultSlot_result[0].text()).toBe(defaultSlot_text);
  })
  
  /** SHADOW CLASS TEST */
  it('render shadow correctly', () => {
    // no shadow
    let wrapper = shallowMount(AppCard, {
      props: { noShadow: true }
    })
    expect(wrapper.classes().includes('shadow-none')).toBe(true)
    
    // with shadow
    wrapper = shallowMount(AppCard, {
      props: { noShadow: false }
    })
    
    // hover shadow
    wrapper = shallowMount(AppCard, {
      props: { hoverable: true }
    })
    expect(wrapper.classes().includes('hover:shadow-lg')).toBe(true)
  })


  /** HEADER TEST */
  it('render shadow correctly', () => {
    const header_text = 'Header Text';
    const header_class = 'card-header';
    // via props
    let wrapper = shallowMount(AppCard, {
      props: { header: header_text }
    })
    expect(wrapper.find(`.${header_class}`).text()).toMatch(header_text)
    
    // via slot
    wrapper = shallowMount(AppCard, {
      slots: {
        header: header_text
      },
    })
    expect(wrapper.find(`.${header_class}`).text()).toMatch(header_text)
  })
})
