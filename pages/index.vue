<template>
  <main>
    <div id="home-image" :style="{'background-image': `url(${api_base + 'assets/' + page_data.data.front_image})`}">
      <div class="title-container">
        <h1 id="title">
          {{general_data.data.name}}
        </h1>
        <countdown-timer id="countdown" :event-date="general_data.data.event_date" />
      </div>
    </div>
    <nav id="navigation">
      <NuxtLink id="events" to="/events" class="nav-button">Tapahtumat</NuxtLink>
      <NuxtLink id="signup" to="/signup" class="nav-button">Ilmoittautuminen</NuxtLink>
      <NuxtLink id="contact" to="/contact" class="nav-button">Yhteystiedot</NuxtLink>
    </nav>
    <div id="content">
      <Markdown :source="page_data.data.translations[0].event_description"></Markdown>
    </div>
    <home-footer id="footer"/>
  </main>
</template>

<script setup>
import Markdown from 'vue3-markdown-it';

const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

definePageMeta({layout: "landingpage",});

const {data: page_data} = await useFetch('items/Homepage', {
  baseURL: api_base,
  query: {"fields":"front_image,translations.*", "deep[translations][_filter][languages_id][_eq]": "fi-FI"}
})

const {data: general_data} = await useFetch('items/General', {baseURL: api_base})
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

#countdown {
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
  color: white;
  background-color: grey;
  font-size: clamp(1em, 10vmin,2rem);
  padding: clamp(1em, 7vmax, 4em) 0;
  font-family: var(--title-font);
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
  font-size: clamp(1em, 3vmin,1.5rem);
  max-width: 700px;
}

#footer {
  background-color: var(--secondary);
  color: white;
}
</style>