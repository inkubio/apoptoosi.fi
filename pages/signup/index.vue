<template>
  <div>
    <h2>{{page.translations[0].title}}</h2>
    <div id="content" v-html="$mdRenderer.render(page.translations[0].description)" />
    <div id="button-container">
      <button
          :ref="ticket_type"
          :disabled="false"
          :class="{selected: ticket_type === 'invitee'}"
          @click="select_ticket_type('invitee')">{{page.translations[0].sign_up_invitee_button_text}}</button>
      <button
          :ref="ticket_type"
          :disabled="true"
          :class="{selected: ticket_type === 'student'}"
          @click="select_ticket_type('student')">{{page.translations[0].sign_up_common_button_text}}</button>
      <button
          :ref="ticket_type"
          :disabled="true"
          :class="{selected: ticket_type === 'alumni'}"
          @click="select_ticket_type('alumni')">{{page.translations[0].sign_up_alumni_button_text}}</button>
    </div>

    <sign-up-form
        v-if="ticket_type.length !== 0"
        :fields="form_fields"
        :ticket_type="ticket_type"
    />
  </div>
</template>

<script setup>
const { $directus, $readItems, $readFieldsByCollection, $mdRenderer} = useNuxtApp()

const ticket_type = useState('ticket_type', () => "")

const {data: page} = await useAsyncData('signup', () => {
  return $directus.request(
    $readItems('signup', {
      fields: ["*", "*.*"],
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: "fi"
            }
          }
        }
      }
    })
  )
})
const {data: form_fields} = await useAsyncData('form_fields', () => {
  return $directus.request(
      $readFieldsByCollection('participants')
  )
})

const select_ticket_type = (selected) => {
  ticket_type.value = selected === ticket_type.value ? "" : selected
}
</script>

<style scoped>
h2 {
  font-family: var(--heading-font);
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

input[type="radio"] {
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
#participant-container {
  padding: 1rem 0;
}
.people-container > h2 {
  margin-bottom: 1rem;
}
.spots {
  text-align: center;
  font-size: clamp(1em, 3vmin,1.5rem);
  font-weight: lighter;
  font-family: var(--body-font);
}
ol {
  padding: 0;
  margin: 0;
}
ol > li {
  text-align: center;
  font-size: clamp(1em, 3vmin,1.5rem);
  font-weight: lighter;
  font-family: var(--body-font);
}
</style>