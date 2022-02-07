
import { AppForm } from "@/common/elements";
import { defaultSlotTest } from "../helpers/slot.spec";


const component = AppForm;
const componentName = 'AppForm';

describe(`COMMON TEST: ${componentName}`, () => {
  //Slot Test
  defaultSlotTest(component);
  
  // to-do: test error, onSubmit, 
});