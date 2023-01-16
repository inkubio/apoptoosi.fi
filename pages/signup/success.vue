<template>
  <p>{{page.data.translations[0].success_text}}</p>
</template>

<script setup>
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
p {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  font-size: clamp(1rem, 3vmin,1.5rem);
  max-width: 700px;
}
</style>