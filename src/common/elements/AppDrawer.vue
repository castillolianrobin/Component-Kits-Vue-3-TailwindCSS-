<template>
  <teleport to="#app">
    <transition name="drawer">
      <div 
        v-if="modelValue"
        class="flex w-screen h-screen fixed z-40"
        :class="{ 'justify-start': left, 'justify-end': right }"
      >
        <!-- Shadow -->
        <div
          class="w-full h-full bg-black opacity-60 absolute"
          @click="updateModelValue(false)"
        ></div>
        <!-- Drawer -->
        <div
          class="drawer-container h-full bg-white shadow-lg z-40"
          :style="{ '--drawer-container-width': drawerWidth }"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "AppDrawer",

  props: {
    /** for v-model  */
    modelValue: { type: Boolean, default: false },
    // app: { type: Boolean, default: false },
    /** opens the drawer to the left  */
    left: { type: Boolean, default: false },
    /** opens the drawer to the right  */
    right: { type: Boolean, default: false },
    /** total width of the drawer when opened. (can be any width value)  */
    width: { type: [String, Number], default: 500 },
  },

  setup(props, context) {
    const { width } = toRefs(props);

    /******************************
    COMPONENT STATE 
    ******************************/
    
    // handles the value of the drawer width 
    const drawerWidth = computed(() => {
      const _width = width.value;
      return isNaN(_width) ? _width : `${_width}px`;
    });

    
    function updateModelValue(flag) {
      context.emit("update:modelValue", flag);
    }

    const componentState = { drawerWidth, updateModelValue };

    return {
      ...componentState,
    };
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  width: var(--drawer-container-width)
}

.drawer {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.15s ease-out;
    .drawer-container {
      transition: width 0.2s ease-out;
    }
  }
  &-enter-from,
  &-leave-to {
    opacity: 0;
    .drawer-container {
      width: 0;
    }
  }
}
</style>
