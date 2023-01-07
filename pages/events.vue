<template>
  <ul>
    <li class="events" v-for="(event, index) in events.data" :key="index">
      <event :title="event.name" :description="event.description"
             :image="event.image != null ? `${api_base + 'assets/' + event.image}` : ''"
             :signup="event.signup_url" :parity=index />
    </li>
  </ul>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const {data: events} = await useFetch('items/Events', {
  baseURL: api_base,

})
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>