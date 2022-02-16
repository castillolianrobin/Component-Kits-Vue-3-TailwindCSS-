<template>
  <!-- Container -->
  <div class="flex">
    <!-- Tabs -->
    <div
      v-for="(tab, index) in items"
      :key="`tab-${tab}-${index}`"
      class="p-1 px-3 cursor-pointer select-none transition font-semibold"
      :class="[
        activeIndex === index 
          ? `border-b-2 border-${color} text-${color}` 
          : `border-0 text-gray-400`,
      ]"
      @click="changeTab(index)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

export default {
  name: "AppTabs",

  props: {
    /** for v-model  */
    modelValue: { type: Number, default: 0 },
    /** Array of text to be displayed as tabs  */
    items: { type: Array, default: () => [] },
    /** color of the active tab  */
    color: { type: String, default: 'primary-500' }
  },

  setup(props, context) {
    const { modelValue } = toRefs(props);


    /******************************
    COMPONENT STATE 
    ******************************/

    // the index of the current active tab.
    const activeIndex = ref(modelValue.value);
    // Changes the tab and notifies the parent on change
    function changeTab(index) {
      activeIndex.value = index;
      updateModelValue(index);
    }
    // watch modelValue change and updates activeIndex to reflect
    watch(
      () => modelValue,
      (value) => {
        activeIndex.value = value;
      }
    );
    
    function updateModelValue(tabIndex) {
      context.emit("update:modelValue", tabIndex);
    }

    return {
      activeIndex,
      changeTab,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>