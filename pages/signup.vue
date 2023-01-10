<template>
  <div>
    <h2>{{page.data.translations[0].title}}</h2>
    <div id="content">
      <Markdown :source="page.data.translations[0].description"></Markdown>
    </div>
  </div>
</template>

<script setup>
import Markdown from 'vue3-markdown-it';

const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const {data: page} = await useFetch('items/signup', {
  baseURL: api_base,
  query: {
    "fields":"event_date,image,sign_up_button,event_url,translations.*",
    "deep[translations][_filter][languages_code][_eq]": "fi"}
})

</script>

<style scoped>
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
#content {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
}
</style>