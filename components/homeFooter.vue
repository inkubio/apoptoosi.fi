<template>
  <div id="footer">
    <h2>{{ title }}</h2>
    <div v-for="company in footer" class="container">
      <a :href="company.company_website">
        <img :src="`${$directus.url}assets/${company.logo}`">
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String
})

const { $directus, $readItems} = useNuxtApp()

const {data: footer} = await useAsyncData("sponsors", () => {
  return $directus.request(
      $readItems('sponsors', {
        fields: ["*"]
      })
  )
})
</script>

<style scoped>
h2  {
  font-size: clamp(1em, 10vmin,2rem);
  text-align: center;
  font-weight: normal;
  font-family: var(--heading-font);
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  justify-items: center;
}
img {
  width: clamp(10rem, 20rem, 50vw);
}
a {
  text-align: center;
}
#footer {
  padding-bottom: 2rem;
}
</style>