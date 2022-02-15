<template>
  <div class="relative inline-flex justify-center">
    <div class=" peer">
      <slot>
        <InformationCircleIcon
          class="inline app-icon-sm"
          :class="`text-${color}`"
        ></InformationCircleIcon>
      </slot>
    </div>
    <div
      class="z-0 peer-hover:z-50 opacity-0 peer-hover:opacity-100 absolute transition"
      :class="{
        'top-full': direction === 'bottom',
        'bottom-full': direction === 'top',
        'left-full top-0 bottom-0': direction === 'right',
        'right-full': direction === 'left',
      }"
    >
      <!-- Arrow Up -->
      <div
        class="flex justify-center absolute"
        :class="{
          'right-0': ['top', 'bottom', 'left'].includes(direction),
          'left-0': ['top', 'bottom', 'right'].includes(direction),
          'top-0': ['bottom', 'left', 'right'].includes(direction),
          'top-1/3': ['left', 'top', 'right'].includes(direction),
        }"
      >
        <div
          class="app-tooltip-arrow"
          :class="[
            `border-${color}`,
            {
              'app-tooltip-arrow-up': direction === 'bottom',
              'app-tooltip-arrow-down': direction === 'top',
              'app-tooltip-arrow-left': direction === 'right',
              'app-tooltip-arrow-right': direction === 'left',
            },
          ]"
        ></div>
      </div>
      <!-- Text -->
      <div
        class="
          p-1
          m-1.5
          rounded
          block
          min-w-max
          shadow
          relative
        "
        :class="`bg-${color}`"
      >
        <slot name="content">
          <p class="block text-xs text-white">{{ tooltipText }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/solid";

export default {
  name: "AppTooltip",
  props: {
    /** Theme color of the tooltip */
    color: { type: String, default: "primary-500" },
    /** Basic text to be displayed inside the tooltip */
    tooltipText: { type: String, default: "" },
    /** direction of the tooltip (top, bottom, left, right) */
    direction: {
      type: String,
      default: "bottom",
      validator: (direction) =>
        ["top", "bottom", "left", "right"].includes(direction),
    },
  },
  components: { InformationCircleIcon },
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.app-tooltip {
  &-arrow {
    width: 0;
    height: 0;

    $arrow-size: 7px;

    &-up {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-bottom-width: $arrow-size;
    }
    &-down {
      border-left: $arrow-size solid transparent;
      border-right: $arrow-size solid transparent;
      border-top-width: $arrow-size;
    }

    &-left {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-right-width: $arrow-size;
    }

    &-right {
      border-top: $arrow-size solid transparent;
      border-bottom: $arrow-size solid transparent;
      border-left-width: $arrow-size;
    }
  }
}
</style>