import { mount } from '@vue/test-utils'
import AppModal from '@/common/elements/AppModal.vue'
// import { defaultSlotTest } from '../helpers/slot.spec';


const component = AppModal;
const componentName = 'AppModal';

describe(`COMMON TEST: ${componentName}`, () => {
  // this will be used for testing the modal since it is being telported to #app
  const app = document.createElement('div')
  
  beforeEach(() => {
    // create teleport target
    app.id = 'app'
    document.body.appendChild(app)
  });
  afterEach(() => {
    // clean up
    document.body.outerHTML = ''
  });
  
  
  /** DEFAULT SLOT TEST */
  // defaultSlotTest(component, { props: { modelValue: true } });
  

  it('hide modal correctly', () => {
    const defaultSlot_class = 'default-class';
    const defaultSlot_text = 'Test 1';
    
    // no shadow
    let wrapper = mount(component, {
      props: { modelValue: false },
      slots: {
        default: `<div class="${defaultSlot_class}">${defaultSlot_text}</div>`
      }, 
    });

    const defaultSlot_result = wrapper.findAll(`.${defaultSlot_class}`);
    expect(defaultSlot_result.length).toBe(0);
  });


  /** SHADOW CLASS TEST */
  it('render shadow bg correctly', async () => {
    const bgOpacity = 70
    // no shadow
    let wrapper = mount(component, {
      props: { bgOpacity },
      modelValue: true,
    })
    const modal = await wrapper.findComponent(component);
    const shadowElementOnModal =  modal.findAll(`.opacity-${bgOpacity}`);
      // getElementsByClassName(`opacity-${bgOpacity}`);
    
    // expect(wrapper.html()).toBe(1);
    expect(shadowElementOnModal.length).toBe(0);
  })
})
