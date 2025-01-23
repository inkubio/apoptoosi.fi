<template>
  <div>
    <h2>{{page.translations[0].title}}</h2>
    <div class="content" v-html="$mdRenderer.render(page.translations[0].description)" />
    <div id="quota-container">
      <p class="spots">{{ $t("quota") }}: {{p_count}} / {{page.quota}}</p>
      <p class="spots" v-if="p_count >= page.quota">{{ $t("queue") }}: {{p_count - page.quota}}</p>
    </div>

    <div class="quota_selection">
      <button @click="select_quota('invitee')" :class="{selected: quota == 'invitee'}">
        {{ $t("invitee") }}
      </button>
      <button @click="select_quota('open')" :class="{selected: quota == 'open'}" disabled>
        {{ $t("open") }}
      </button>
    </div>

    <sign-up-form
        v-if="quota.length !== 0"
        :quota="quota"
    />
    <div v-else class="participant-container ">
      <h3 v-if="quota.length === 0">{{ $t("signups") }}</h3>

      <ol v-if="p_count != 0">
        <li v-for="p in participants">
          {{p.public_name ? p.first_name + " " + p.last_name : $t("hidden")}}
        </li>
      </ol>
      <p v-else>{{ $t("no_signups") }}</p>

    </div>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems, $readSingleton, $aggregate, $mdRenderer} = useNuxtApp()
const {locale} = useI18n()

const quota = useState('quota', () => "")

const {data: page} = await useAsyncData('signup', () => {
  return $directus.request(
    $readSingleton('signup', {
      fields: ["*", {"translations": ["*"]}],
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

const {data: participants} = await useAsyncData('participants_req', () => {
  return $directus.request(
      $readItems('participants', {
        fields: ["*"],
        sort: "date_created",
        limit: -1
      })
  )
})
const {data: participant_count} = await useAsyncData('participants_count', () => {
  return $directus.request(
      $aggregate('participants', {
        aggregate: {"count": "*"}
      })
  )
})

const p_count = computed(() => {
  return parseInt(participant_count.value[0].count ?? 0)
})

const select_quota = (selected_quota: string) => {
  if (selected_quota === quota.value) {
    quota.value = "";
    return
  }
  quota.value = selected_quota;
}

const signup_open = (quota) => {
  let now = Date.now()
  let timezone_offset = new Date(now).getTimezoneOffset()

  // Set now to finnish time
  now = new Date(Date.now())

  let open_time = new Date(Date.parse(page.value.signup_open + "+02:00"))
  let close_time = new Date(Date.parse(page.value.signup_close + "+02:00"))

  if (quota === "invitee") {
    open_time = new Date(Date.parse(page.value.signup_open_invite + "+02:00"))
    close_time = new Date(Date.parse(page.value.signup_close_invite + "+02:00"))
  }

  return (now > open_time && now < close_time)
}

</script>

<style scoped>
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
  border-radius: 0.5em;
  transition: 0.1s;
}

button:hover {
  opacity: 0.5;
}
button:disabled {
  opacity: 0.2;
}
.quota_selection {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.selected {
  background-color: var(--nav3);
}
.participant-container {
  padding: 1rem 0;
}
.spots {
  text-align: center;
  font-size: clamp(1em, 3vmin,1.5rem);
  font-weight: lighter;
  font-family: var(--body-font);
  margin-top: 1rem;
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