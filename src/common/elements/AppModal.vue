<template>
  <teleport to="body">
    <transition name="modal">
      <!-- Modal Component -->
      <div
        v-if="modelValue"
        class="
          flex
          items-center
          justify-center
          fixed
          inset-0
          w-screen
          h-screen
          overflow-hidden
        "
      >
        <!-- Shadow  -->
        <div
          class="inline h-full w-full fixed inset-0 bg-black z-40"
          :class="`opacity-${bgOpacity}`"
          @click="updateModelValue(false)"
        ></div>
        <!-- Content -->
        <div class="z-50">
          <slot name="content">
            <AppCard>
              <slot> Modal Card </slot>
            </AppCard>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
// import { reactive, toRefs } from 'vue'
import AppCard from "./AppCard.vue";

export default {
  name: "AppModal",
  components: { AppCard },
  props: {
    modelValue: { type: Boolean, default: false },
    bgOpacity: { type: [Number, String], default: 50 },
  },
  setup(props, context) {
    
    /******************************
    COMPONENT STATE 
    ******************************/
    function updateModelValue(value) {
      context.emit("update:modelValue", value);
    }

    return {
      updateModelValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal {
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