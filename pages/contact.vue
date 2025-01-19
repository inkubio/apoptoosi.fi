<template>
  <div>
    <h2>{{page.translations[0].title}}</h2>
    <div id="content" v-html="$mdRenderer.render(page.translations[0].description)" />
    <address>
      <a :href="`mailto:${page.email}`">{{page.email}}</a>
    </address>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readSingleton} = useNuxtApp()

const {data: page} = await useAsyncData('contact', () => {
  return $directus.request(
      $readSingleton('contact', {
        fields: ["email", {"translations": ['*']}],
      })
  )
})

</script>

<style scoped>
address {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
  text-decoration: none;
}
a {
  color: var(--primary);
}
</style>