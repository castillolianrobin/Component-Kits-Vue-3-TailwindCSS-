<template>
  <div>
    <h1 class="text-center text-2xl font-semibold uppercase underline">Sandbox: </h1>
    <AppCard hoverable>
      <p>This is a card</p>
    </AppCard>
  </div>
</template>

<script>
import { AppCard } from '../shared/elements';
export default {
  components: { AppCard },
  setup () {    
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>