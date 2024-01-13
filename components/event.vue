<template>
  <svg width="0" height="0">
    <clipPath id="shape" clipPathUnits="objectBoundingBox">
      <path
          d="M0.502,0 C0.508,0.115,0.564,0.161,0.763,0.264 C0.961,0.367,1,0.419,1,0.506 C0.999,0.593,0.897,0.66,0.767,0.732 C0.635,0.806,0.502,0.865,0.502,1 C0.503,0.863,0.372,0.809,0.265,0.743 C0.131,0.669,0,0.591,0.002,0.505 C0.004,0.418,0.071,0.354,0.242,0.264 C0.42,0.171,0.508,0.107,0.502,0">

      </path>
    </clipPath>
  </svg>
  <div id="container" class="parity">
    <div class="title"
         :style="{'background-image': `url(${image})`}"
         :class="Date.now() < new Date(date).getTime() ? null: 'past_event'" >
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
}
.parity {
  grid-template-areas: "image info";
  grid-template-columns: 1fr 1fr;
}
.parity-right {
  grid-template-areas: "info image";
}
.past_event {
  filter: grayscale(1);
}

.title {
  width: clamp(300px, 50vmin, 400px);
  margin: clamp(0rem, 2vmin,2.5rem);
  grid-area: image;
  background-color: black;
  aspect-ratio: 0.55;
  background-position: center;
  background-size: cover;
  clip-path: url("#shape");
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-self: center;

}

@media only screen and (max-width: 700px) {
  #container {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
h2 {
  text-align: center;
  font-size: clamp(1rem, 7vmin,2.5rem);
  color: var(--title_color);
  font-family: var(--heading-font);
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