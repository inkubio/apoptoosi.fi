<template>
  <div id="container" class="parity" :class="{'parity-right': image_right}">
    <div class="title" :class="{'title-right': image_right}" :style="{'background-image': `url(${image})`}">
      <h2>{{title}}</h2>
    </div>
    <div class="info">
      <p>{{description}}</p>
      <a :href="signup">Ilmoittaudu</a>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const props = defineProps({
  title: String,
  description: String,
  image: String,
  signup: String,
  parity: Number,
})

const image_right = computed(() =>props.parity % 2 !== 0)
console.log(image_right)

</script>

<style scoped>
#container {
  display: grid;
}
.parity {
  grid-template-areas: "image info";
  grid-template-columns: 1fr 1fr;
}
.parity-right {
  grid-template-areas: "info image";
}

.title {
  width: 100%;
  grid-area: image;
  background-color: black;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-size: cover;
  border-radius: 0 5rem 5rem 0;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.title-right {
  border-radius: 5rem 0 0 5rem;
}

@media only screen and (max-width: 700px) {
  .parity {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "image" "info";
  }
  .title {
    border-radius: 0;
  }
}
h2 {
  text-align: center;
  font-size: clamp(0.5rem, 7vmin,2.5rem);
  color: var(--text-secondary);
  font-family: var(--title-font);
  margin-bottom: 2em;
}
.info {
  padding: 1rem;
  max-width: 600px;
  grid-area: info;
  text-align: center;
  align-self: center;
  justify-self: center;
  font-family: var(--body-font);
  margin: 2rem auto;
  font-size: clamp(1rem, 3vmin,1.5rem);
}
a {
  text-decoration: none;
  color: white;
  padding: 0.5em;
  background-color: green;
  font-weight: lighter;
  font-family: var(--title-font);
}
</style>