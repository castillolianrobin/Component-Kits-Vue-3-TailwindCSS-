<template>
  <div>
    <h1 class="text-center text-2xl font-semibold uppercase underline">
      Sandbox:
    </h1>
    <AppCard hoverable>
      <p>This is a card</p>
    </AppCard>
    <!-- Buttons -->
    <div>
      <AppBtn sm>
        <template v-slot:prepend>
          <ArrowCircleDownIcon class="app-icon-sm"></ArrowCircleDownIcon>
        </template>
        Small Button
      </AppBtn>
      <AppBtn lg>
          <template v-slot:prepend>
            <ArrowCircleDownIcon class="app-icon-lg"></ArrowCircleDownIcon>
          </template>
          Large Button
      </AppBtn>
      <AppBtn>
        <template v-slot:prepend>
          <ArrowCircleDownIcon class="app-icon"></ArrowCircleDownIcon>
          <!-- <AppIcon icon="ArrowCircleDownIcon" class="h-6 w-6" /> -->
        </template>
        Primary Button
      </AppBtn>
      <AppBtn outline>Outline Button</AppBtn>
      <AppBtn outline disabled> 
        Outline Button Disabled </AppBtn>
      <AppBtn disabled>Disabled Button</AppBtn>
      <AppBtn color="secondary">Secondary Button</AppBtn>
      <AppBtn color="alert">warning Button</AppBtn>
      <AppBtn color="error">danger Button</AppBtn>
      <AppBtn color="success">success Button</AppBtn>
      <AppBtn color="success" loading="">success Button</AppBtn>
      <AppBtn outline color="success" loading="" lg>success Button</AppBtn>
      <AppBtn outline color="success" loading="" sm>success Button</AppBtn>
      <AppLoading v-if="false"></AppLoading>
    </div>

    <!-- Inputs -->
    <div class="m-4">
      <h2 class="mb-2 underline">Inputs</h2>
      <AppFormInputBase label="Base Input" error="test">
        <template v-slot:append>
          <ArrowCircleDownIcon class="app-icon"></ArrowCircleDownIcon>
        </template>
      </AppFormInputBase>
        <!-- <template v-slot:append>
          <ArrowCircleDownIcon class="app-icon"></ArrowCircleDownIcon>
        </template> -->
      result: {{ test }}
      required: {{ required }}
      <AppBtn @click="changeRequired">Toggle Required</AppBtn>
    </div>

    <div class="m-4">
      <AppFormInput validateOnChange validations="" error="test"></AppFormInput>
      <h2 class="mb-2 underline font-bold">FORM SAMPLE:</h2>
      <AppForm v-model="form">
        <AppFormInputBase v-model="test"  validateByForm validateOnChange name="Test" label="Label Here" validations="required"></AppFormInputBase>
      <div class="mt-2">
          <AppFormCheckbox v-model="checkbox" label="test" ></AppFormCheckbox>
          <AppFormCheckbox v-model="checkboxItem" primaryLabel="checkbox" :items="[ { value: 'Test', label: 'Test Value' }, { value: 'asdad', label: 'asdaTest Value' } ]">
          </AppFormCheckbox>
          <AppFormRadio v-model="checkboxItem" primaryLabel="radio" :items="[ { value: 'Test', label: 'Test Value' }, { value: 'asdad', label: 'asdaTest Value' } ]"></AppFormRadio>
          <!-- <AppFormCheckbox v-model="checkTest" value="toinks" label="asdad"></AppFormCheckbox> -->
          <!-- <AppFormRadio></AppFormRadio> -->
          checkbox items: {{ checkboxItem }}
        </div>

        <AppFormSelect
          v-model="formSelect"
          label="Select"
          :items="[
            { value: 'asdas', text: 'asdasd' },
            { value: 'asssdas', text: 'asdasd 2' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasdsa 3' },
          ]"
        ></AppFormSelect>
      
        <AppDropdown 
          label="dropdown"
          :items="[
            { value: 'asdas', text: 'asdasd' },
            { value: 'asssdas', text: 'asdasd 2' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasd 3' },
            { value: 'asadas', text: 'asdasdsa 3' },
          ]"
        >
        </AppDropdown>
        <AppFormInputItems v-model="formItems" label="asdas"></AppFormInputItems>
        <AppFormFile v-model="formFile"></AppFormFile>
        <AppFormInputDate v-model="formDate"></AppFormInputDate>
        {{ formDate }}
        <AppFormInputDecimal v-model="formDecimal"></AppFormInputDecimal>
        <AppFormInput v-model="formDecimal"></AppFormInput>
        {{ formDecimal }}
        <AppFormTextArea v-model="formArea"></AppFormTextArea>
        <AppBtn submit>Submit</AppBtn>
      </AppForm >
    </div>
  </div>
</template>

<script>
// Elements
import { 
  AppCard,
  AppBtn,
  AppFormInputBase,
  AppForm,
  AppFormInput,
  AppLoading,
  AppFormCheckbox,
  AppFormRadio,
  AppFormSelect,
  AppFormInputItems,
  AppDropdown,
  AppFormFile,
  AppFormInputDate,
  AppFormInputDecimal,
  AppFormTextArea,
} from "../common/elements";
// Icons
import { ArrowCircleDownIcon } from "@heroicons/vue/solid" 
import { validation } from '@/common/composables/useValidation';
import { ref } from '@vue/runtime-core';

export default {
  components: { 
    AppCard, 
    AppBtn, 
    AppFormInputBase,
    AppForm,
    AppFormInput,
    AppLoading,
    ArrowCircleDownIcon,
    AppFormCheckbox,
    AppFormRadio,
    AppFormSelect,
    AppDropdown,
    AppFormInputItems,
    AppFormFile,
    AppFormInputDate,
    AppFormInputDecimal,
    AppFormTextArea,
  },
  data() {
    return {
      required: false,
      validation,
    }
  },
  methods: {
    check(val) {
      console.log('val', val);
    },
    changeRequired() {
      this.required = !this.required;
    },
  },
  setup() {
    const test = ref('');
    const checkbox = ref();
    const checkboxItem = ref();
    const formSelect = ref();
    const form = ref(false);
    const formItems = ref(['asdas', 'asdad']);
    const formFile = ref();
    const formDate = ref();
    const formDecimal = ref();
    const formArea = ref();
    
    return {
      test,
      checkbox,
      checkboxItem,
      form,
      formSelect,
      formItems,
      formFile,
      formDate,
      formDecimal,
      formArea,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>