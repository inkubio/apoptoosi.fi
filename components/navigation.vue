<template>
  <nav>
    <NuxtLink id="home" to="/" class="nav-button">Apoptoosi XIX</NuxtLink>
    <NuxtLink to="/events" class="nav-button">Tapahtumat</NuxtLink>
    <NuxtLink to="/signup" class="nav-button">Ilmoittautuminen</NuxtLink>
    <NuxtLink to="/about" class="nav-button">Yhteystiedot</NuxtLink>
  </nav>
</template>

<script>
export default {
  name: "navigation.vue"
}
</script>

<style scoped>
nav {
  display: grid;
  grid-template-columns: 75% repeat(3, auto);
  height: 3em;
  padding: 0 1em;
}
.nav-button {
  font-family: 'Cinzel', serif;
  text-decoration: none;
  color: black;
  margin: auto 0;
  text-align: center;
  transition: 0.3s;
}
.nav-button:hover {
  color: green;
}
#home {
  font-size: 1.5em;
  text-align: left;
}
.router-link-active {
  font-weight: bold;
}
</style>