<template>
  <div class="bg-primary-100 h-full flex items-center justify-center">
    <div></div>
    <AppCard class="w-96 p-5">
      <AppFormInput label="Username"></AppFormInput>
      <AppFormInput type="password" label="Password"></AppFormInput>
      <AppBtn>Login</AppBtn>
    </AppCard>

  </div>
</template>

<script>
// Elements
import { 
  AppFormInput,
  AppCard,
  AppBtn,
} from "../common/elements";
import { reactive, toRefs } from 'vue';

export default {
  name: 'Login',
  components: {
    AppCard,
    AppFormInput,
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