import { shallowMount } from '@vue/test-utils'
import AppCard from '@/shared/elements/AppCard.vue'
import { defaultSlotTest } from '../common/slot.spec';

describe('COMMON TEST: AppCard.vue', () => {
  
  /** DEFAULT SLOT TEST */
  defaultSlotTest(AppCard);


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
