<template>
  <form class="container" @submit.prevent="handleSubmit">
    <div v-for="field in fields">
      <form-text-field v-if="field.meta.interface === 'input'" :field_key="field.field"
                       :name="field.meta?.translations[0]?.translation" :required="field.meta.required"
                       :placeholder="field.meta.options?.placeholder"
                       v-model="form[`${field.field}`]"
      />
      <form-selection-field v-else-if="field.meta.interface === 'select-radio'" :field_key="field.field"
                            :name="field.meta?.translations[0]?.translation" :required="field.meta.required"
                            :choices="field.meta.options.choices"
                            v-model="form[`${field.field}`]"
      />
      <p v-else>Not implemented</p>
    </div>
    <button type="submit">Lähetä</button>
  </form>

</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const props = defineProps({
  fields: Object,
  is_invited: false,
  reservation_time: String,
})

const form = {
  'invited': props.is_invited,
  'reservation_time': props.reservation_time
}

const router = useRouter();

const handleSubmit = async () => {

  const {data: res} = await useFetch('items/participants', {
    baseURL: api_base,
    method: "POST",
    body: form,
    onRequestError({ request, options, error }) {
      console.log(request)
      console.log(error)
    },
    onResponseError({ response, options, error }) {
      console.log(response)
      console.log(error)
      alert(`Signup failed with status code ${response.status}, check browser log. If problem persists contact apoptoosi@inkubio.fi`)
    },
    onResponse({ response, options, error }) {
      if (response.ok) {
        router.push("/signup/success")
      }
    }
  })




}

</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  padding-bottom: 2rem;
  gap: 1rem;
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