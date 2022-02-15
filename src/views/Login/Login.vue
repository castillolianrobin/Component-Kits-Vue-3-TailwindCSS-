<template>
  <div class="p-1 h-full flex items-center justify-center bg-primary-900">
    <AppCard class="flex p-0 rounded overflow-hidden">
      <!-- Form -->
      <AppForm
        v-model="form.valid"
        class="
          pt-5 p-3 w-full  md:w-64
          flex flex-col
          justify-end items-center
          bg-primary-50"
        @validated="login"
      >
        <!-- Username -->
        <AppFormInput
          v-model="form.username"
          validateByForm
          validateOnChange
          label="Username"
          validations="required"
          :disabled="loading"
        ></AppFormInput>
        <!-- Password -->
        <AppFormInput
          v-model="form.password"
          validateByForm
          validateOnChange
          type="password"
          label="Password"
          validations="required"
          :disabled="loading"
        ></AppFormInput>
        <!-- Submit -->
        <AppBtn
          submit
          class="mt-4 px-5"
          :loading="loading"
        >
          Login
        </AppBtn>
        <!-- Error -->
        <p class="text-xs text-error-500 mt-1">{{ form.error }}</p>

        <p class="mt-auto text-sm text-gray-400">
          Can't Login ?
          <AppTooltip
            :tooltipText="
              `username: ${credentials.username} | password: ${credentials.password}`
            "
            direction="top"
          ></AppTooltip>
        </p>
      </AppForm>
      <!-- Logo -->
      <div class="w-64 h-80 flex flex-col justify-center">
        <img src="./login-logo.png">
      </div>
    </AppCard>

  </div>
</template>

<script>
// Elements
import { 
  AppForm,
  AppFormInput,
  AppCard,
  AppBtn,
  AppTooltip,
} from "../../common/elements";
// vue
import { ref } from 'vue';
// router
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useLayout } from '../../common/composables/useLayout';
export default {
  name: 'Login',
  components: {
    AppCard,
    AppForm,
    AppFormInput,
    AppBtn,
    AppTooltip,
  },
  setup () {
    useLayout('DefaultLayout');
    // useRouter hook;
    const router = useRouter();
    //store hook
    const store = useStore();
    
    console.log(store.getters['auth/test']);
    // mock valid credentials
    const credentials = {
      username: 'user',
      password: 'password',
    };

    // input variables
    const form = ref({
      valid: false,
      username: '',
      password: '',
      error: '',
    });

    const loading = ref(false);

    function login() {
      form.value.error = '';
      
      if (!form.value.valid) {
        return form.value.error = 'Please complete the form';
      }
        
      loading.value = true;

      setTimeout(()=> {
        loading.value = false;
  
        store.dispatch('auth/login', { 
          data: { username: form.value.username, password: form.value.password },
          onSuccess() {
            alert('Login success!');
            router.push('/dashboard');
          },
          onError() {
            return form.value.error = 'Incorrect username/password';
          },
         });
      }, 2000);
    }
  
    return {
      form,
      loading,
      credentials,
      login
    }
  }
}
</script>

<style lang="scss" scoped>

</style>