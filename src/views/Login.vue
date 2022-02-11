<template>
  <div class="bg-primary-500 h-full">
    <AppCard class="w-96">
      <AppBtn></AppBtn>
    </AppCard>

  </div>
</template>

<script>
// Elements
import { 
  AppCard,
  AppBtn,
} from "../common/elements";
import { reactive, toRefs } from 'vue';

export default {
  name: 'Login',
  components: {
    AppCard,
    AppBtn,
  },
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