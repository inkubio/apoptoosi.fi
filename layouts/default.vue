<template>
  <div class="container">
    <navigation />
    <slot />
  </div>
</template>

<script>
export default {
  name: "default.vue"
}
</script>

<style scoped>
.container {
  min-height: 100dvh;
  background-color: #ccd7cf;
}
</style>