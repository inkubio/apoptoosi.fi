<template>
  <main>
    <div id="home-image" :style="{'background-image': `url(${$directus.url}assets/${page?.hero_image}`}">
      <nav id="language-selection">
        <button v-for="l in locales"
                class="language-button"
                :class="{'selected-language': l.value == locale}"
                @click="setLocale(l.value)">{{l}}</button>
      </nav>
      <div class="title-container">
        <h1 id="title" v-if="page?.logo != null">
          <img :src="`${$directus.url}assets/${page.logo}`" :alt="general?.event_name">
        </h1>
        <h1 v-else class="title name">{{general?.event_name}}</h1>
        <p id="event-date">{{formatDate(general?.event_date)}}</p>
      </div>
      <span v-if="page.hero_image_credit != null" id="image_credit">{{page?.hero_image_credit}}</span>
    </div>
    <nav id="navigation">
      <NuxtLink id="events" :to="localePath('events')" class="nav-button">{{ $t("events") }}</NuxtLink>
      <NuxtLink id="signup" :to="localePath('signup')" class="nav-button disabled" >{{ $t("signup") }}</NuxtLink>
      <NuxtLink id="contact" :to="localePath('contact')" class="nav-button">{{ $t("contact") }}t</NuxtLink>
    </nav>
    <div class="content" v-html="$mdRenderer.render(page.translations[0]?.description)" />
    <home-footer id="footer" :title="page.translations[0]?.footer_title"/>
  </main>
</template>

<script setup lang="ts">
const { setLocale, locales, locale} = useI18n()
const localePath = useLocalePath()
const { $directus, $readSingleton } = useNuxtApp()

definePageMeta({layout: "landingpage",});

const {data: page} = await useAsyncData('homepage', () => {
  return $directus.request(
      $readSingleton('homepage', {
        fields: ["hero_image", "logo", "hero_image_credit", {"translations": ["*"]}],
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

const {data: general} = await useAsyncData('general', () => {
  return $directus.request(
      $readSingleton('general', {
        fields: ["event_name", "event_date"]
      })
  )
})

function formatDate(date: string){
  let d = new Date(Date.parse(date))
  return d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear()
}


</script>

<style scoped>
main {
  display: flex;
  flex-flow: column;
  width: 100%;
}
#home-image {
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(45deg, rgba(8,195,179,1) 0%, rgba(0,212,255,1) 100%);;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.title-container {
  position: relative;
  left: 0;
  right: 0;
  top: 25%;
}
.title {
  text-align: center;
  font-size: min(15vmin,6rem);
  font-weight: normal;
  color: var(--title_color);
  margin-bottom: 0;
  vertical-align: bottom;
}

.year {
  font-family: var(--nav-font);
  font-size: min(15vmin,4.5rem);
  line-height: 1;
  opacity: 0.9;
}

.name {
  font-family: var(--title-font);
  vertical-align: text-bottom;
  line-height: 1;
}

#title img {
  height: clamp(1rem, 25vmin, 15rem);
}

#image_credit {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: clamp(0.5rem,1vmin,1rem);
  opacity: 0.5;
  color: var(--text-secondary);
}

#event-date {
  width: 100%;
  text-align: center;
  font-size: min(10vmin,4rem);
  font-weight: normal;
  font-family: var(--title-font);
  color: var(--title_color);
  margin-top: 0;
}

#navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(33%, (60rem - 100%) * 999, 100%), 1fr));
}

.nav-button {
  text-decoration: none;
  color: var(--text-secondary);
  background-color: grey;
  font-size: clamp(1em, 10vmin,2rem);
  padding: clamp(1em, 7vmax, 4em) 0;
  font-family: var(--heading-font);
  font-weight: lighter;
  text-align: center;
  transition: 0.3s;
}

.nav-button:hover {
  opacity: 0.75;
}

#language-selection {
  position: absolute;
  right: 1rem;
  top: 1rem;
}
.language-button {
  background: none;
  border: none;
  font-family: var(--nav-font), san-serif;
  font-size: clamp(0.5rem, 10vmin,1rem);
}
.language-button:hover {
  color: var(--text-secondary);
}
.selected-language {
  font-weight: bold;
}

#events {
  background-color: var(--nav1);
}
#signup {
  background-color: var(--nav2);
}
#contact {
  background-color: var(--nav3);
}

#footer {
  background-color: var(--secondary);
  color: var(--text-secondary);
}
</style>