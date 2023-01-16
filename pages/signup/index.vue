<template>
  <div>
    <h2>{{page.data.translations[0].title}}</h2>
    <div id="content">
      <Markdown :source="page.data.translations[0].description"></Markdown>
    </div>
    <div id="button-container">
      <button :disabled="!signup_enabled_invite" @click="select_signup('invite')"
              :class="{selected: selected_signup === 'invite'}">
        {{page.data.translations[0].sign_up_invitee_button_text}}
      </button>
      <button :disabled="!signup_enabled_common" @click="select_signup('common')"
              :class="{selected: selected_signup === 'common'}">
        {{page.data.translations[0].sign_up_common_button_text}}
      </button>
    </div>
    <sign-up-form :fields="signup_fields" v-if="selected_signup != null"
                  :is_invited="selected_signup === 'invite'"
                  :reservation_time="signup_selection_time"
    />

  </div>
</template>

<script setup>
import Markdown from 'vue3-markdown-it';

const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL
const sign_up_api = runtimeConfig.public.apiBase

const {data: page} = await useFetch('items/signup', {
  baseURL: api_base,
  query: {
    "fields":"event_date,image,sign_up_button,event_url,translations.*",
    "deep[translations][_filter][languages_code][_eq]": "fi"}
})

const {data: signup_fields} = await useFetch('participants/fields', {
  baseURL: sign_up_api,
})

const signup_enabled_invite = ref(false)
const signup_enabled_common = ref(false)

const selected_signup = ref(null)
const signup_selection_time =  ref(null)

const select_signup = (selected) => {
  selected_signup.value = selected
  signup_selection_time.value = new Date(Date.now()).toISOString()
}

let enable_sign_up

onMounted(() => {
  enable_sign_up = new EventSource(sign_up_api +'signup/enable');

  enable_sign_up.onmessage = (e) => {
    let d = JSON.parse(e.data);
    signup_enabled_invite.value = d?.invited || signup_enabled_invite.value
    signup_enabled_common.value = d?.common || signup_enabled_common.value
  };
})

onUnmounted(() => {
  enable_sign_up.close()
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
button:disabled {
  opacity: 0.2;
}
#button-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.selected {
  background-color: var(--nav3);
}
</style>