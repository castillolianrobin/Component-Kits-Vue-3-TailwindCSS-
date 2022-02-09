<template>
  <div class="relative">
    <div class="w-full cursor-pointer" @click="active = !active">
      <slot name="activator">
        <AppBtn><slot>{{ label }}</slot></AppBtn>
      </slot>
    </div>
    <!-- Dropdowns Items -->
    <transition name="items">
      <div
        v-if="active"
        class="
          absolute
          top-full
          max-h-80
          overflow-auto
          bg-gray-100
          shadow-lg
          z-40
        "
      >
        <slot name="dropdown">
          <div
            v-for="(item, index) in dropdownItems"
            :key="`select-item-${index}`"
            class="px-3 p-1 cursor-pointer hover:bg-gray-200 transition-colors"
            @click="onItemClick(item)"
          >
            {{ item.text }}
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, ref, toRefs } from "vue";
import AppBtn from "./AppBtn.vue";

export default {
  name: "AppDropdown",
  props: {
    items: { type: Array, default: () => [] },
    label: { type: String, default: '' },
  },
  components: { AppBtn },
  setup(props, context) {
    
    /******************************
    COMPONENT STATE 
    ******************************/

    // state of the dropdown items
    const active = ref(false);

    // items to be displayed
    const dropdownItems = computed(() => {
      const { items } = toRefs(props);
      return items.value.map((item) => ({
        text: item.text || item.value || item,
        value: item.value || item,
      }));
    });

    function onItemClick(val) {
      context.emit("itemClick", val);
    }

    return {
      active,
      dropdownItems,
      onItemClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.items {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s ease;
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    // margin-top: -1.25rem;
  }
}
</style>