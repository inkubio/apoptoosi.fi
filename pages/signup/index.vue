<template>
  <div>
    <h2>{{page.translations[0].title}}</h2>
    <div id="content" v-html="$mdRenderer.render(page.translations[0].description)" />
    <div id="button-container">
      <button
          :ref="quota"
          :disabled="!signup_open('invitee')"
          :class="{selected: quota === 'invitee'}"
          @click="select_ticket_type('invitee')">{{page.translations[0].sign_up_invitee_button_text}}</button>
      <button
          :ref="quota"
          :disabled="!signup_open('open')"
          :class="{selected: quota === 'open'}"
          @click="select_ticket_type('student')">{{page.translations[0].sign_up_common_button_text}}</button>
      <button
          :ref="quota"
          :disabled="!signup_open('alumni')"
          :class="{selected: quota === 'alumni'}"
          @click="select_ticket_type('alumni')">{{page.translations[0].sign_up_alumni_button_text}}</button>
    </div>

    <div id="quota-container">
      <p class="spots">Avoin kiintiö: {{quota_amount("open")}} / {{page.quota_common}}</p>
      <p class="spots">Alumnikiintiö: {{quota_amount("alumni")}} / {{page.quota_alumni}}</p>
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
        sort: "date_created"
      })
  )
})

const {data: participants_count} = await useAsyncData('participants_count', () => {
  return $directus.request(
      aggregate('participants', {
        aggregate: {"count": "*"},
        groupBy: ["quota"],
        query: {
          access_token: "Cbuc_3lBpP_kz43ddMps3VV2HBarPqh9",
        }
      })
  )
})

console.log(participants_count)

let quota_used_spots = Object.fromEntries(participants_count.value.map((x) => [x.quota, x.count]));

const quota_amount = (selected_quota) => {
  let quota_alumni = quota_used_spots["alumni"] ?? 0
  let quota_open = quota_used_spots["open"] ?? 0

  if (quota_alumni > page.value.quota_alumni) {
    quota_open = quota_open + quota_alumni - page.value.quota_alumni
    quota_alumni = page.value.quota_alumni
  }

  if (selected_quota === "alumni") {
    return quota_alumni
  }
  return quota_open
}

const signup_open = (quota) => {
  let now = Date.now()
  let timezone_offset = new Date(now).getTimezoneOffset()

  // Set now to finnish time
  now = now + 60*1000*timezone_offset + 2*60*60*1000

  let open_time = Date.parse(page.value.signup_open + "+02:00")
  let close_time = Date.parse(page.value.signup_close + "+02:00")

  if (quota === "invitee") {
    open_time = Date.parse(page.value.signup_open_invite + "+02:00")
    close_time = Date.parse(page.value.signup_close_invite + "+02:00")
  }

  return (now > open_time && now < close_time)
}

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
#quota-container {
  font-family: var(--body-font);
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
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