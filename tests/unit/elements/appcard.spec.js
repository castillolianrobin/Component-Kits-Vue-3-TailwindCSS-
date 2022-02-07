import { shallowMount } from '@vue/test-utils'
import AppCard from '@/common/elements/AppCard.vue'
import { defaultSlotTest } from '../helpers/slot.spec';


const component = AppCard;
const componentName = 'AppCard';

describe(`COMMON TEST: ${componentName}`, () => {
  
  /** DEFAULT SLOT TEST */
  defaultSlotTest(component);


  /** SHADOW CLASS TEST */
  it('render shadow correctly', () => {
    // no shadow
    let wrapper = shallowMount(component, {
      props: { noShadow: true }
    })
    expect(wrapper.classes().includes('shadow-none')).toBe(true)
    
    // with shadow
    wrapper = shallowMount(component, {
      props: { noShadow: false }
    })
    
    // hover shadow
    wrapper = shallowMount(component, {
      props: { hoverable: true }
    })
    expect(wrapper.classes().includes('hover:shadow-lg')).toBe(true)
  })


  /** HEADER TEST */
  it('render shadow correctly', () => {
    const header_text = 'Header Text';
    const header_class = 'card-header';
    // via props
    let wrapper = shallowMount(component, {
      props: { header: header_text }
    })
    expect(wrapper.find(`.${header_class}`).text()).toMatch(header_text)
    
    // via slot
    wrapper = shallowMount(component, {
      slots: {
        header: header_text
      },
    })
    expect(wrapper.find(`.${header_class}`).text()).toMatch(header_text)
  })
})
