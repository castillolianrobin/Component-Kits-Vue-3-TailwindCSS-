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
      <AppBtn color="secondary-500">Secondary Button</AppBtn>
      <AppBtn color="alert-500">warning Button</AppBtn>
      <AppBtn color="error-500">danger Button</AppBtn>
      <AppBtn color="success-500">success Button</AppBtn>
      <AppBtn color="success-500" loading="">success Button</AppBtn>
      <AppBtn outline color="success-500" loading="" lg>success Button</AppBtn>
      <AppBtn outline color="success-500" loading="" sm>success Button</AppBtn>
      <AppLoading v-if="false"></AppLoading>
    </div>

    <!-- Inputs -->~
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
        <AppFormFile v-model="formFile" label="adas" validations="required" validateOnChange></AppFormFile>
        {{ formFile }}
        <AppFormInputDate v-model="formDate"></AppFormInputDate>
        {{ formDate }}
        <AppFormInputDecimal v-model="formDecimal"></AppFormInputDecimal>
        <AppFormInput v-model="formDecimal"></AppFormInput>
        {{ formDecimal }}
        <AppFormTextArea v-model="formArea"></AppFormTextArea>
        <AppBtn submit>Submit</AppBtn>
      </AppForm>

      <AppModal v-model="modal">
        test
        <XIcon @click="modal = false    "></XIcon>
      </AppModal>
      <AppBtn @click="modal = !modal">Toggle Modal</AppBtn>
      <AppPagination
        v-model:currentPage="page"
        :pageVisible="4" 
        :itemsPerPage="1"
        :total="23"
      ></AppPagination>

      <AppTable
        hoverable
        v-model:currentPage="tablePage"
        :headers="['header1', 'header2', 'header3']"
        :items="[
          { header1: 'item 1', header2: 'item 2', header3: 'item 3',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
          { header1: 'item 2', header2: 'item 3', header3: 'item 5',},
        ]"  
      ></AppTable>

      <AppBtn @click="tablePage = 1">{{ tablePage }}</AppBtn>
    
      <AppTabs v-model="tabIndex" :items="['tab 1', 'tab 2', 'tab 3']"></AppTabs>
      <AppSteps v-model="step" :stepText="[ 'Step 1', 'Step 2', 'Step 3' ]"></AppSteps>

      <AppDrawer v-model="drawer" right="">
        <p>Drawer here</p>
      </AppDrawer>
      <AppBtn @click="drawer = !drawer">Toggle drawer</AppBtn>
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
  AppModal,
  AppPagination,
  AppTable,
  AppTabs,
  AppSteps,
  AppDrawer,
} from "../common/elements";
// Icons
import { ArrowCircleDownIcon, XIcon } from "@heroicons/vue/solid" 
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
    AppModal,
    XIcon,
    AppPagination,
    AppTable,
    AppTabs,
    AppSteps,
    AppDrawer,
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
    const modal = ref(false);
    const page = ref(22);
    const tablePage = ref(1);
    const tabIndex = ref(0);
    const step = ref(0);
    const drawer = ref(true);
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
      modal,
      page,
      tablePage,
      tabIndex,
      step,
      drawer,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>