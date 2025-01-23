<template>
  <div>
    <p>{{ $t("signup_success")}}:</p>
    <ul v-if="form_data !== null">
      <li><b>{{$t("quota")}}</b><br>
        {{$t(form_data.quota)}}
      </li>
      <li v-for="field in form_fields_sorted" :key="field.field">
        <b>{{field?.meta?.translations[locale_index].translation}}:</b><br>
        {{$t(form_data[field.field] ?? "")}}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import nuxtStorage from "nuxt-storage/nuxt-storage";

const {locale} = useI18n()
const {data: form_fields} = await useFetch("/api/signup/fields")

const form_data = nuxtStorage.sessionStorage.getData("form")

const form_fields_sorted = computed(() => {
  return form_fields.value.toSorted((a, b) => a.meta.sort - b.meta.sort)
})

const locale_index = computed(() => {
  if (locale.value == "en") {
    return 0
  }
  if (locale.value == "fi") {
    return 1
  }
  return 0
})

</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-flow: column;
  font-family: var(--body-font);
  margin: 2rem auto;
  max-width: 1000px;
  text-align: left;
  font-size: clamp(1rem, 3vmin,1.5rem);
}
</style>