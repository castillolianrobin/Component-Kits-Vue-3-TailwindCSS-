<template>
  <div class="flex">
    <!-- Step Container -->
    <div
      v-for="(step, index) in displayableSteps"
      :key="step"
      class="flex-grow flex justify-center relative"
    >
      <div class="flex justify-end">
        <!-- Step Line -->
        <div
          v-if="index > 0"
          class="mr-5 mt-3 h-1 w-full absolute"
          :class="[index <= modelValue ? `bg-${color}` : `bg-gray-300`]"
        ></div>
        <!-- Step Number Container -->
        <div
          class="z-10 flex flex-col items-center cursor-pointer"
          @click="updateModelValue(index)"
        >
          <!-- Step Number/Icon -->
          <div
            class="
              h-8
              w-8
              ring-4 ring-white
              rounded-full
              flex
              justify-center
              items-center
            "
            :class="[
              index <= modelValue
                ? `text-white bg-${color}`
                : 'text-gray-500 bg-gray-300',
            ]"
          >
            <CheckIcon
              v-if="checkOnDone && index <= modelValue"
              class="app-icon"
            ></CheckIcon>
            <p v-else>{{ step.number }}</p>
          </div>
          <!-- Step Text -->
          <p
            class="text-sm"
            :class="[
              index <= modelValue
                ? `text-${color} font-semibold`
                : 'text-gray-400',
            ]"
          >
            {{ step.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
import { CheckIcon } from "@heroicons/vue/solid";

export default {
  name: "AppSteps",

  components: { CheckIcon },

  props: {
    /** for v-model  */
    modelValue: { type: [Number, String], default: 0 },
    /** color of the active steps  */
    color: { type: String, default: 'primary-500' },
    /** Number of steps to be displayed  */
    steps: { type: Number, default: 0 },
    /** OPTIONAL: Name of the steps (In order)  */
    stepText: { type: Array, default: () => [] },
    /** OPTIONAL: Whether to display a check on step completion  */
    checkOnDone: { type: Boolean, default: false },
  },
  setup(props, context) {
    const { steps, stepText } = toRefs(props);


    /******************************
    COMPONENT STATE 
    ******************************/
    // Steps to be displayed along with its name, if any.
    const displayableSteps = computed(() => {
      const stepCount = steps.value || stepText.value.length;

      return new Array(stepCount).fill("").map((val, i) => ({
        number: i + 1,
        text: stepText.value[i] || null,
      }));
    });


    function updateModelValue(stepIndex) {
      context.emit("update:modelValue", stepIndex);
    }
    const componentState = { displayableSteps, updateModelValue };

    return {
      ...componentState,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>