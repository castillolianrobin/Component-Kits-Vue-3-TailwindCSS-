<template>
  <div
    class="
      p-2
      flex
      items-center
      cursor-pointer
      rounded-l
      hover:text-primary-500
      hover:bg-white
      transition
    "
    :class="{ 'bg-primary-500': active }"
    @click="onClick"
  >
    <slot name="icon">
      <FolderIcon class="app-icon-sm"></FolderIcon>
    </slot>
    <p class="ml-2"><slot>{{ text }}</slot></p>
  </div>
</template>

<script>
import { FolderIcon } from '@heroicons/vue/solid';

export default {
  props: {
    text: { type: String, default: '' },
    active: { type: Boolean, default: false },
  },
  components: { FolderIcon },
  setup (props, context) {
    /******************************
    COMPONENT STATE 
    ******************************/
    
    function onClick() {
      context.emit('click', true);
    }
  
    return {
      onClick,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>