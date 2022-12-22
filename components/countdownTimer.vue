<template>
  <p>{{time_until}}</p>
</template>
<script setup>
const props = defineProps({
  eventDate: String
})

const time_until = ref("00:00:00:00")

const final_date = new Date(props.eventDate)

watch(time_until, () => setTimeout(() => {
  let d = Date.now().valueOf()
  let d_final = final_date.valueOf()
  d = d_final - d

  let days_ms = 1000*60*60*24
  let hours_ms = 1000*60*60
  let minutes_ms = 1000*60
  let seconds_ms = 1000

  let days = Math.floor(d /days_ms)
  d -= days*days_ms
  let hours = Math.floor(d /hours_ms)
  d -= hours*hours_ms
  let minutes = Math.floor(d/minutes_ms)
  d -= minutes*minutes_ms
  let seconds =  Math.floor(d/seconds_ms)

  const zeroPad = (num, places) => String(num).padStart(places, '0')

  time_until.value = `${days}:${zeroPad(hours,2)}:${zeroPad(minutes,2)}:${zeroPad(seconds,2)}`
}, 1000), {immediate: true})


</script>

<style scoped>
</style>