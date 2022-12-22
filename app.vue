<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Roboto:wght@300&display=swap');

body {
  margin: 0;
  padding: 0;
}

.page-enter-active, .page-leave-active {
  transition: all 0.3s;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active, .layout-leave-active {
  transition: all 0.2s;
}

.layout-enter-from, .layout-leave-to {
  opacity: 0;
}
</style>