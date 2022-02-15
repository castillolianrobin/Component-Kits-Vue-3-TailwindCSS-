<template>
  <component :is="layouts[layoutName]">
    <slot></slot>
  </component>
</template>

<script>
import { initLayout } from '../composables/useLayout';
import * as Layouts from './';
export default {
  setup () {
    // initializaes the Layouts
    const { layouts, layoutName } = initLayout(Layouts);

    return {
      layouts,
      layoutName,
    }
  }
}
</script>