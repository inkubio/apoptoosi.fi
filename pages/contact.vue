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
h2 {
  font-family: var(--heading-font);
  text-decoration: none;
  font-weight: normal;
  color: black;
  margin: auto 0;
  text-align: center;
  transition: 0.3s;
  font-size: min(5vmin,2rem);
}
#content {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
}
address, a {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
  text-decoration: none;
  color: var(--primary);

}
</style>