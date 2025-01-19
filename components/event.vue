<template>
  <div id="container">
    <div class="title" :style="{'background-image': `url(${image})`}">
      <span v-if="date != null">{{event_date}}</span>
    </div>
    <div class="info">
      <h2>{{title}}</h2>
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

const event_date = computed(() => {
  let a = new Date(props.date)
  return a.getDate() + "." + (a.getMonth()+1) + "."
})

</script>

<style scoped>
#container {
  display: grid;
  grid-template-areas: "image info";
  grid-template-columns: 1fr 1fr;
  max-width: 1500px;
  margin: 0 auto;
  border-bottom: rgba(1, 1, 1, 0.2) solid 1px;
}

.title {
  width: clamp(300px, 50vmin, 400px);
  margin: clamp(0rem, 2vmin,2.5rem);
  grid-area: image;
  background-color: black;
  aspect-ratio: 1;
  background-position: center;
  background-size: cover;
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-self: center;
  align-self: center;
}

@media only screen and (max-width: 700px) {
  #container {
    display: flex;
    flex-flow: column;
    align-items: center;
    border-bottom: none;
  }
}

span {
  text-align: center;
  font-size: 3rem;
  color: var(--text-secondary);
  font-family: var(--heading-font);
  -webkit-text-stroke: 1px var(--title_color); /* Outline color and width (webkit browsers) */
  text-stroke: 1px var(--title_color);
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
svg {
  width: 0;
  height: 0;
}
</style>