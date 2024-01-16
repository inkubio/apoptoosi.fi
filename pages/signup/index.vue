<template>
  <div>
    <h2>{{page.translations[0].title}}</h2>
    <div id="content" v-html="$mdRenderer.render(page.translations[0].description)" />
    <div id="button-container">
      <button
          :ref="quota"
          :disabled="false"
          :class="{selected: quota === 'invitee'}"
          @click="select_ticket_type('invitee')">{{page.translations[0].sign_up_invitee_button_text}}</button>
      <button
          :ref="quota"
          :disabled="true"
          :class="{selected: quota === 'student'}"
          @click="select_ticket_type('student')">{{page.translations[0].sign_up_common_button_text}}</button>
      <button
          :ref="quota"
          :disabled="true"
          :class="{selected: quota === 'alumni'}"
          @click="select_ticket_type('alumni')">{{page.translations[0].sign_up_alumni_button_text}}</button>
    </div>

    <sign-up-form
        v-if="quota.length !== 0"
        :quota="quota"
    />
    <div id="participant-container" v-else>
      <h3>Osallistujat</h3>
      <p class="spots">Ilmoittautuneita: {{participants_count[0].count}}</p>
      <ol>
        <li v-for="p in participants">{{p.first_name}} {{p.last_name}}</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import {aggregate} from "@directus/sdk";

const { $directus, $readItems, $mdRenderer} = useNuxtApp()

const quota = useState('quota', () => "")

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

const {data: participants} = await useAsyncData('participants', () => {
  return $directus.request(
      $readItems('participants', {
        fields: ["*"],
      })
  )
})

const {data: participants_count} = await useAsyncData('participants_count', () => {
  return $directus.request(
      aggregate('participants', {
        aggregate: {"count": "*"},
        query: {
          access_token: "Cbuc_3lBpP_kz43ddMps3VV2HBarPqh9",
        }
      })
  )
})
console.log(participants_count)

const select_ticket_type = (selected) => {
  quota.value = selected === quota.value ? "" : selected
}
</script>

<style scoped>
h2, h3 {
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