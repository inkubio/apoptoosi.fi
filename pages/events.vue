<template>
  <ul v-if="events.data.length > 0">
    <li class="events" v-for="(event, index) in events.data" :key="index">
      <event :title="event.translations[0].name" :description="event.translations[0].description"
             :image="event.image != null ? `${api_base + 'assets/' + event.image}` : ''"
             :signup="event.event_url"
             :signup_text="event.translations[0].sign_up_button_text"
             :signup_enabled="event.sign_up_button"
             :date="event.event_date"
             :parity=index />
    </li>
  </ul>
  <ul v-else><p>Tapahtumat julkaistaan myöhemmin</p></ul>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const {data: events} = await useFetch('items/events', {
  baseURL: api_base,
  query: {
    "fields":"event_date,image,sign_up_button,event_url,translations.*",
    "deep[translations][_filter][languages_code][_eq]": "fi"}
})

</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
p {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  font-size: clamp(1rem, 3vmin,1.5rem);
  max-width: 700px;
}
</style>