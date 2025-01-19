<template>
  <ul v-if="events.length > 0">
    <li class="events" v-for="(event, index) in events" :key="index">
      <event :title="event.translations[0].name" :description="event.translations[0].description"
             :image="event.image != null ? `${$directus.url}assets/${event.image}` : ''"
             :signup="event.event_url"
             :signup_text="event.translations[0].signup_button_text"
             :signup_enabled="event.sign_up_button"
             :date="event.event_date"
             :parity=index />
    </li>
  </ul>
  <ul v-else><p>Tapahtumat julkaistaan myöhemmin</p></ul>
</template>

<script setup lang="ts">
const { $directus, $readItems } = useNuxtApp()
const {locale} = useI18n()

const {data: events} = await useAsyncData('events', () => {
  return $directus.request(
      $readItems('events', {
        fields: ["event_date", "image", "sign_up_button", "event_url", {"translations": ['*']}],
        sort: ["event_date"],
        filter: {
          translations: {
            languages_code: {_eq: locale.value}
          },
        },
        deep: {
          translations: {
            _filter: {
              languages_code: { _eq: locale.value}
            }
          }
        }
      })
  )
})
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>