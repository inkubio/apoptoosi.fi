<template>
  <main>
    <div id="home-image">
      <div class="title-container">
        <h1 id="title">
          Apoptoosi XIX
        </h1>
        <countdown-timer id="countdown"/>
      </div>
    </div>
    <nav id="navigation">
      <NuxtLink id="events" to="/events" class="nav-button">Tapahtumat</NuxtLink>
      <NuxtLink id="signup" to="/signup" class="nav-button">Ilmoittautuminen</NuxtLink>
      <NuxtLink id="about" to="/about" class="nav-button">Yhteystiedot</NuxtLink>
    </nav>
    <div id="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi congue ultricies enim, vel maximus mauris
      ullamcorper sed. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc in justo vel justo lobortis
      mattis. Sed ultricies a metus eu iaculis. Nullam sit amet fringilla libero, vitae elementum augue. Etiam non
      sapien ac velit malesuada congue. Suspendisse rhoncus pharetra metus et ullamcorper. Praesent nec quam eu tellus
      posuere iaculis. Pellentesque blandit, risus id sollicitudin fermentum, ex felis commodo ipsum, at condimentum
      quam elit imperdiet ligula. Nam sollicitudin id tellus in maximus.

      Quisque sodales nunc sit amet nisi imperdiet egestas. Vestibulum ante ipsum primis in faucibus orci luctus et
      ultrices posuere cubilia curae; In feugiat purus vel leo placerat dictum. Maecenas ac ultrices mi. Aenean sed leo
      sem. Sed eros metus, facilisis eget erat non, interdum pulvinar eros. Etiam sed nunc eget elit porta euismod. Nunc
      rutrum pulvinar risus in mollis. Proin et nisi nisi. Pellentesque ornare lectus id arcu bibendum posuere. Vivamus
      a orci lorem. Nam cursus ultrices tortor, et semper neque volutpat sed. Aenean varius non orci vitae gravida.
    </div>
    <home-footer id="footer"/>
  </main>
</template>

<script>
definePageMeta({layout: "landingpage",});
export default {
  name: "index.vue",
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
  background-image: url('~/assets/apoptoosi.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  filter: grayscale(100%);
}
.title-container {
  position: relative;
  left: 0;
  right: 0;
  top: 25%;
}
#title {
  text-align: center;
  font-size: 6em;
  font-weight: bold;
  font-family: 'Cinzel', serif;
  color: white;
  margin-bottom: 0;
}

#countdown {
  width: 100%;
  text-align: center;
  font-size: 4em;
  font-weight: bold;
  font-family: 'Cinzel', serif;
  color: white;
  margin-top: 0;
}

#navigation {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.nav-button {
  text-decoration: none;
  color: white;
  background-color: grey;
  font-size: 2em;
  padding: 4em 0;
  font-family: 'Cinzel', serif;
  text-align: center;
  transition: 0.3s;
}
.nav-button:hover {
  opacity: 0.75;
}
#events {
  background-color: #B1B2B5;
}
#signup {
  background-color: #5f5f5f;
}
#about {
  background-color: #353535;
}

#content {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  margin: 2rem auto;
  font-size: 1.5em;
  max-width: 700px;
}

#footer {
  background-color: black;
  color: white;
}
</style>