<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.page-enter-active, .page-leave-active {
  transition: all 0.05s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active, .layout-leave-active {
  transition: all 0.05s;
}

.layout-enter-from, .layout-leave-to {
  opacity: 0;
}
</style>