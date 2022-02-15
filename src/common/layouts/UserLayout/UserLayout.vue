<template>
  <div class="h-full w-full grid grid-rows-userLayout grid-cols-userLayout bg-gray-100">
    <TopNav></TopNav>
    <SideNav></SideNav>
    <div class="row-start-2 col-start-2 overflow-auto">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import TopNav from './TopNav.vue'
import SideNav from './SideNav/SideNav.vue'

export default {
  components: { TopNav, SideNav },
  setup () {
    const state = reactive({
      count: 0,
    })
  
    return {
      ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>

</style>