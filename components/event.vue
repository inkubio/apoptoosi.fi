<template>
  <div id="container" class="parity" :class="{'parity-right': image_right}">
    <div class="title" :style="{'background-image': `url(${image})`}">
      <h2>{{title}}</h2>
      <span v-if="date != null">{{event_date}}</span>
    </div>
    <div class="info">
      <p>{{description}}</p>
      <a v-if="signup_enabled" :href="signup">{{signup_text}}</a>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig()
const api_base = runtimeConfig.public.baseURL

const props = defineProps({
  title: String,
  date: String,
  description: String,
  image: String,
  signup: String,
  signup_text: String,
  signup_enabled: Boolean,
  parity: Number,
})

const image_right = computed(() =>props.parity % 2 !== 0)
console.log(image_right)

const event_date = computed(() => {
  let a = new Date(props.date)
  return a.getDate() + "." + (a.getMonth()+1)
})

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
  width: clamp(300px, 50vmin, 600px);
  margin: clamp(0rem, 2vmin,2.5rem);
  grid-area: image;
  background-color: black;
  aspect-ratio: 1 / 1;
  background-position: center;
  background-size: cover;
  border-radius: 25em;
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-self: center;
}

@media only screen and (max-width: 700px) {
  .parity {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: "image" "info";
  }
}
h2 {
  text-align: center;
  font-size: clamp(1rem, 7vmin,2.5rem);
  color: var(--text-secondary);
  font-family: var(--title-font);
}
span {
  text-align: center;
  font-size: clamp(1rem, 7vmin,2.5rem);
  color: var(--text-secondary);
  font-family: var(--title-font);
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
  background-color: var(--primary);
  font-weight: lighter;
  font-family: var(--body-font);
}
</style>