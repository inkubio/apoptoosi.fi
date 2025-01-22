<template>
  <div id="footer">
    <h2>{{ title }}</h2>
    <div class="container">
      <a :href="company.company_website"  v-for="company in footer">
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
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  align-items: center;
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