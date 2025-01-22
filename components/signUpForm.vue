<template>
  <form class="container" @submit.prevent="handleSubmit">
    <div v-for="(field, i) in form_fields_sorted" :key="i">
      <form-fields-short-text v-if="field?.meta?.interface === 'input'"
                                         :field_key="field.field"
                                         :name="field?.meta?.translations[1].translation"
                                         :required="field?.meta.required"
                                         :placeholder="field?.options?.placeholder"
                                         v-model="form[field.field]"
      />
      <form-fields-long-text v-else-if="field?.meta?.interface === 'input-multiline'"
                             :field_key="field.field"
                             :name="field?.meta?.translations[1].translation"
                             :required="field?.meta.required"
                             :placeholder="field?.options?.placeholder"
                             v-model="form[field.field]"
      />
      <form-fields-toggle v-else-if="field?.meta?.interface === 'boolean'"
                          :field_key="field.field"
                          :name="field.meta?.translations[1].translation"
                          :required="field?.meta.required"
                          v-model="form[field.field]"
      />
      <form-fields-radio v-else-if="field?.meta?.interface === 'select-radio'"
                         :field_key="field.field"
                         :required="field?.meta.required"
                         :name="field.meta?.translations[1].translation"
                         :choices="field.meta.options.choices"
                         v-model="form[field.field]"
      />
      <p v-else>Not implemented</p>
    </div>
    <button type="submit">Lähetä</button>
  </form>

</template>

<script setup>
const { $directus, $createItem, $withToken, $readFieldsByCollection, $readItems} = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const {locales, locale, } = useI18n()

const props = defineProps({
  quota: String,
  reservation_time: String,
})

const {data: form_fields} = await useFetch("/api/signup/fields")

const form_fields_sorted = computed(() => {
  console.log(form_fields.value)
  return form_fields.value.toSorted((a, b) => a.meta.sort - b.meta.sort)
})

const form = useState('form', () => {
  return {
    'quota': props.quota,
  }
})


const router = useRouter();

const handleSubmit = async () => {
  form.value["quota"] = props.quota
  /*const {data: res} = await useAsyncData('send_signup', () => {
    return $directus.request(
        $createItem('participants', form.value)
    )
  })*/
  console.log(form.value)

  /*if (res.value.ok) {
    await router.push({path: "signup/success", query: form.value})
  } else {
    console.log(res)
    alert(`Signup failed with status code ${res.status}, check browser log. If problem persists contact apoptoosi@inkubio.fi`)
  }*/
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
  transition: 0.3s;
}
button:hover {
  opacity: 0.5;
}

</style>