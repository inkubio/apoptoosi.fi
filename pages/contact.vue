<template>
  <div class="background">
    <h2>{{page_data.data.translations[0].title}}</h2>
    <p>{{page_data.data.translations[0].description}}</p>
    <address>
      <a :href="`mailto:${page_data.data.email}`">{{page_data.data.email}}</a>
    </address>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const {data: page_data} = await useFetch('items/About', {
  baseURL: api_base,
  query: {"fields":"email,translations.*", "deep[translations][_filter][languages_code][_eq]": "fi-FI"}
})

</script>

<style scoped>
.background {
  background-color: #ccd7cf;
}
h2 {
  font-family: var(--title-font);
  text-decoration: none;
  font-weight: normal;
  color: black;
  margin: auto 0;
  text-align: center;
  transition: 0.3s;
  font-size: min(5vmin,2rem);
}
p {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
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