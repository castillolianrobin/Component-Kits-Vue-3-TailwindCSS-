<template>
  <div
    class="flex items-center justify-center col-start-2 h-12 shadow bg-white"
  >
    <!-- App Brand -->
    <div class="flex items-center ml-2">
      <img src="@/assets/logo.png" class="ml-2 h-12 w-12" />
      <h1 class="ml-1 text-primary-500 font-mono font-semibold">
        JetStream Inc.
      </h1>
    </div>
    <!-- Logout Btn -->
    <AppBtn
      sm
      class="ml-auto mr-2"
      color="secondary-400"
      @click="confirmLogout = true"
    >
      Logout
      <template v-slot:append>
        <LogoutIcon class="app-icon-sm"></LogoutIcon>
      </template>
    </AppBtn>
  </div>

  <AppModal v-model="confirmLogout">
    <div class="px-4 py-1">
      <p class="mb-2 font-semibold text-lg text-primary-500">
        Confirm Logout
      </p>
      <p class="">Are you sure you want to logout?</p>
      <div class="mt-5 flex justify-end">
        <AppBtn sm color="secondary-500" @click="confirmLogout = false">
          Cancel
        </AppBtn>
        <AppBtn sm class="ml-1" @click="logout">
          Logout
        </AppBtn>
      </div>
    </div>
  </AppModal>
</template>

<script>
import { LogoutIcon } from "@heroicons/vue/solid";
import { computed, reactive, ref, toRefs } from "vue";
import { AppBtn, AppModal } from "../../elements";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: { AppBtn, AppModal, LogoutIcon },
  setup() {
    const store = useStore();
    const router = useRouter();

    const token = computed(() => store.getters["auth/token"]);
    const state = reactive({
      count: 0,
    });
    const confirmLogout = ref(false);
    function logout() {
      store.dispatch("auth/logout", {
        onLogout: () => {
          router.push("/login");
        },
      });
    }

    return {
      token,
      ...toRefs(state),
      confirmLogout,
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>