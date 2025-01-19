<template>
  <nav>
    <NuxtLink id="home" :to="localePath('/')" class="nav-button">Apoptoosi XX</NuxtLink>
    <div class="subnav">
      <NuxtLink :to="localePath('/events')" class="nav-button">Tapahtumat</NuxtLink>
      <NuxtLink :to="localePath('/signup')" class="nav-button">Ilmoittautuminen</NuxtLink>
      <NuxtLink :to="localePath('/contact')"class="nav-button">Yhteystiedot</NuxtLink>
      <div id="language-selector">
        <button v-for="l in locales"
                class="language-button"
                :class="{'selected-language': l == locale}"
                @click="setLocale(l)">{{l}}</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navigation.vue"
}
</script>

<script setup>
const { setLocale, locales, locale} = useI18n()
const localePath = useLocalePath()
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
  min-height: 3em;
  padding: 0 1em;
  margin-bottom: 1rem;
}
.subnav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(20%, (30rem - 100%) * 999, 100%), 1fr));
  row-gap: 1em;
  justify-items: center;
  align-items: center;
}

.nav-button {
  font-family: var(--heading-font);
  text-decoration: none;
  color: black;
  margin: auto 0;
  text-align: center;
  transition: 0.3s;
  font-size: min(5vmin,1.2rem);
}
.nav-button:hover {
  color: var(--primary);
}
#home {
  font-size: min(5vmin,1.5em);
  text-align: left;
  font-family: var(--title-font);
}
.router-link-active {
  font-weight: bold;
}

#language-selector {

}

.language-button {
  background: none;
  border: none;
  font-family: var(--title-font), san-serif;
  font-size: clamp(0.5rem, 10vmin,1rem);
}
.language-button:hover {
  color: var(--text-secondary);
}
.selected-language {
  font-weight: bold;
}

@media all and (max-width: 991px) {
  #home {
    text-align: center;
  }
  .subnav {
    padding-top: 1rem;
  }
  nav {
    border-bottom: rgba(1, 1, 1, 0.2) solid 1px;
  }
}
</style>