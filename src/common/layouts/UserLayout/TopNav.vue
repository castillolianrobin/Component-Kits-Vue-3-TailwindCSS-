<template>
  <div class="
    flex items-center justify-center
    col-start-2
    h-12
    shadow
    bg-white
  ">
    <!-- App Brand -->
    <div class="flex items-center ml-2">
      <img src="@/assets/logo.png" class="ml-2 h-12 w-12"/>
      <h1 class="ml-1 text-primary-500 font-mono font-semibold">JetStream Inc.</h1>
    </div>
    <!-- Logout Btn -->
    <AppBtn sm class="ml-auto mr-2" color="secondary-400" @click="logout">
      Logout
      <template v-slot:append>
        <LogoutIcon class="app-icon-sm"></LogoutIcon>
      </template>
    </AppBtn>
  </div>
</template>

<script>
import { LogoutIcon } from '@heroicons/vue/solid';
import { computed, reactive, toRefs } from 'vue'
import { AppBtn } from '../../elements'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  components: { AppBtn, LogoutIcon, },
  setup () {
    const store = useStore();
    const router = useRouter()

    const token = computed(()=>store.getters['auth/token']);
    const state = reactive({
      count: 0,
    })

    function logout() {
      store.dispatch('auth/logout', {
        onLogout: () => { router.push('/login'); }, 
      });
    }
  
    return {
      token,
      ...toRefs(state),
      logout,
    }
  }
}
</script>

<style lang="scss" scoped>

</style>