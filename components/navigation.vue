<template>
  <nav>
    <NuxtLink id="home" to="/" class="nav-button">Apoptoosi XIX</NuxtLink>
    <div class="subnav">
      <NuxtLink to="/events" class="nav-button">Tapahtumat</NuxtLink>
      <NuxtLink to="/signup" class="nav-button">Ilmoittautuminen</NuxtLink>
      <NuxtLink to="/about" class="nav-button">Yhteystiedot</NuxtLink>
    </div>
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
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 30rem), 1fr));
  min-height: 3em;
  padding: 0 1em;
}
.subnav {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(clamp(33%, (30rem - 100%) * 999, 100%), 1fr));
  row-gap: 1em;
}

.nav-button {
  font-family: 'Cinzel', serif;
  text-decoration: none;
  color: black;
  margin: auto 0;
  text-align: center;
  transition: 0.3s;
  font-size: min(5vmin,1em);
}
.nav-button:hover {
  color: green;
}
#home {
  font-size: min(5vmin,1.5em);
  text-align: left;
}
.router-link-active {
  font-weight: bold;
}
@media all and (max-width: 991px) {
  #home {
    text-align: center;
  }
}
</style>