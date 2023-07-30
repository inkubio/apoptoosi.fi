<template>
  <main>
    <div id="home-image" :style="{'background-image': `url(${api_base + 'assets/' + page.data.hero_image})`}">
      <div class="title-container">
        <h1 id="title" v-if="page.data.logo != null">
          <img :src="`${api_base + 'assets/' + page.data.logo}`" :alt="general.data.event_name">
        </h1>
        <h1 v-else id="title">{{general.data.event_name}}</h1>
        <p id="countdown">{{general.data.event_date.split("T")[0]}}</p>
        <!--<countdown-timer id="countdown" :event-date="general.data.event_date" />-->
      </div>
      <span v-if="page.data.hero_image_credit != null" id="image_credit">{{page.data.hero_image_credit}}</span>
    </div>
    <nav id="navigation">
      <NuxtLink id="events" to="/events" class="nav-button">Tapahtumat</NuxtLink>
      <!--<NuxtLink id="signup" to="/signup" class="nav-button disabled" >Ilmoittautuminen</NuxtLink>-->
      <NuxtLink id="contact" to="/contact" class="nav-button">Yhteystiedot</NuxtLink>
    </nav>
    <div id="content">
      <Markdown :source="page.data.translations[0].description"></Markdown>
    </div>
    <home-footer id="footer" :title="page.data.translations[0].footer_title"/>
  </main>
</template>

<script setup>
import Markdown from 'vue3-markdown-it';

const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

definePageMeta({layout: "landingpage",});

const {data: page} = await useFetch('items/homepage', {
  baseURL: api_base,
  query: {"fields":"hero_image,logo,hero_image_credit,translations.*", "deep[translations][_filter][languages_id][_eq]": "fi"}
})

const {data: general} = await useFetch('items/general', {baseURL: api_base})

function formatDate(date){
  let d = Date.parse(date)
  return d.getDay() + "." + d.getMonth() + 1 + "." + d.getFullYear() + "."
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
#title {
  text-align: center;
  font-size: min(15vmin,6rem);
  font-weight: normal;
  font-family: var(--title-font);
  color: var(--title_color);
  margin-bottom: 0;
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

#countdown {
  width: 100%;
  text-align: center;
  font-size: min(10vmin,4rem);
  font-weight: normal;
  font-family: var(--heading-font);
  color: var(--title_color);
  margin-top: 0;
}

#navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(33%, (60rem - 100%) * 999, 100%), 1fr));
}
.nav-button {
  text-decoration: none;
  color: white;
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
#events {
  background-color: var(--nav1);
}
#signup {
  background-color: var(--nav2);
}
#contact {
  background-color: var(--nav3);
}

#content {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  padding: 0 1rem;
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
}

#footer {
  background-color: var(--secondary);
  color: white;
}
</style>