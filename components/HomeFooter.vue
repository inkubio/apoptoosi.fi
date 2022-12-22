<template>
  <div>
    <h2>Yhteistyössä</h2>
    <div v-for="company in footer_data.data" class="container">
      <a :href="company.website_url">
        <img :src="api_base + 'assets/' + company.logo">
      </a>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const {data: footer_data} = await useFetch('items/Sponsors', {baseURL: api_base})
</script>

<style scoped>
h2  {
  font-size: clamp(1em, 10vmin,2rem);
  text-align: center;
  font-weight: bold;
  font-family: 'Cinzel', serif;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
  justify-items: center;
}
img {
  max-width: clamp(20rem, 50vw, 20rem);
}
a {
  text-align: center;
}
</style>