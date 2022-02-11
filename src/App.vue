<template>
  <div class="w-screen h-screen">
    <transition name="redirect">
      <router-view/>
    </transition>
  </div>
</template>


<style lang="scss">
@import './common/styles/app';

/* Error enter/leave transition css */
.redirect-enter-active,
.redirect-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.redirect-enter-from,
.redirect-leave-to {
  opacity: 0;
  /* margin-top: -5px; */
}
</style>