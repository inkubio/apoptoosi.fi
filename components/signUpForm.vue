<template>
  <form class="container" @submit.prevent="handleSubmit">
    <div v-for="(field, i) in form_fields_sorted" :key="i">
      <form-fields-short-text v-if="field?.meta?.interface === 'input'"
                                         :field_key="field.field"
                                         :name="field?.meta?.translations[locale_index].translation"
                                         :required="field?.meta.required"
                                         :placeholder="field?.meta?.options?.placeholder"
                                         v-model="form[field.field]"
      />
      <form-fields-long-text v-else-if="field?.meta?.interface === 'input-multiline'"
                             :field_key="field.field"
                             :name="field?.meta?.translations[locale_index].translation"
                             :required="field?.meta.required"
                             :placeholder="field?.meta?.options?.placeholder"
                             v-model="form[field.field]"
      />
      <form-fields-toggle v-else-if="field?.meta?.interface === 'boolean'"
                          :field_key="field.field"
                          :name="field.meta?.translations[locale_index].translation"
                          :required="field?.meta.required"
                          v-model="form[field.field]"
      />
      <form-fields-radio v-else-if="field?.meta?.interface === 'select-radio'"
                         :field_key="field.field"
                         :required="field?.meta.required"
                         :name="field.meta?.translations[locale_index].translation"
                         :choices="field.meta.options.choices"
                         v-model="form[field.field]"
      />
      <p v-else>Not implemented</p>
    </div>
    <button type="submit" :disabled="submit_disabled">{{ $t("sign_up") }}</button>
  </form>

</template>

<script setup>
import nuxtStorage from "nuxt-storage/nuxt-storage";

const {locale} = useI18n()
const localePath = useLocalePath()
const router = useRouter();

const props = defineProps({
  quota: String,
  reservation_time: String,
})

const {data: form_fields} = await useFetch("/api/signup/fields")

const form_fields_sorted = computed(() => {
  return form_fields.value.toSorted((a, b) => a.meta.sort - b.meta.sort)
})

const form = useState('form', () => {
  return {
    'quota': props.quota,
  }
})

const submit_disabled = useState('submit_disabled', () => false)

// FIX: Quick and dirty solution for selecting language for form field.
const locale_index = computed(() => {
  if (locale.value == "en") {
    return 0
  }
  if (locale.value == "fi") {
    return 1
  }
  return 0
})

const handleSubmit = async () => {
  form.value["quota"] = props.quota
  submit_disabled.value = true
  const {body, success, status} = await $fetch("/api/signup/submit", {
    method: "POST",
    body: form.value,
  })

  if (success) {
    nuxtStorage.sessionStorage.setData("form", form.value)
    await router.push({path: localePath('/signup/success')})
  } else {
    alert(`Signup failed with status code ${status}, check browser log. If problem persists contact it@inkubio.fi`)
  }
  submit_disabled.value = false
}
</script>

<style scoped>
.container {
  font-family: var(--body-font);
  font-size: clamp(1em, 3vmin,1.5rem);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  padding: 2rem 0;
  gap: 1em;
}

button {
  text-decoration: none;
  box-shadow: none;
  color: white;
  padding: 0.5em;
  background-color: var(--secondary);
  font-size: clamp(1em, 3vmin,1.5rem);
  font-weight: lighter;
  font-family: var(--body-font);
  border: none;
  border-radius: 0.5em;
  transition: 0.3s;
}
button:hover {
  opacity: 0.5;
}
button:disabled {
  opacity: 0.2;
}

</style>