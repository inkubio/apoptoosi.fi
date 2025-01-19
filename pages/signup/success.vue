<template>
  <div>
    <p>{{page.translations[0].success_text}}</p>
    <p>Ilmoittauduit seuraavilla tiedoilla:</p>
    <ul>
      <li><b>Kiintiö</b>: {{ quota($route.query.quota) }}</li>
      <li><b>Nimi</b>: {{$route.query.first_name}} {{$route.query.last_name}}</li>
      <li><b>Nimeni saa näyttää julkisessa osallistujalistassa</b>: {{human_bool($route.query.public_name)}}</li>
      <li><b>Sähköposti</b>: {{$route.query.email}}</li>
      <li><b>Opiskelujen aloitusvuosi</b>: {{$route.query.fuksivuosi}}</li>
      <li><b>Lipputyyppi</b>: {{ticket_type($route.query.ticket_type)}}</li>
      <li><b>Erityisruokavaliot</b>: {{$route.query.diet ?? "-"}}</li>
      <li><b>Pääruoka</b>: {{main_course($route.query.main_course)}}</li>
      <li><b>Alkoholi</b>: {{alcohol($route.query.alcohol)}}</li>
      <li><b>Avecin nimi</b>: {{$route.query.avec ?? "-"}}</li>
      <li><b>Pöytäseuruetoive</b>: {{$route.query.table_group ?? "-"}}</li>
      <li><b>Edustamani taho</b>: {{$route.query.organisation ?? "-"}}</li>
      <li><b>Esitän tervehdyksen cocktailtilaisuudessa</b>: {{human_bool($route.query.gift)}}</li>
      <li><b>Ostan sillislipun</b>: {{human_bool($route.query.sillis)}}</li>
      <li><b>Ostan Inkubio 20 vuotta -historiateoksen</b>: {{human_bool($route.query.history_book)}}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { $directus, $readItems} = useNuxtApp()

const {data: page} = await useAsyncData('signup', () => {
  return $directus.request(
      $readItems('signup', {
        fields: [{"translations": ["*"]}],
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: "fi"
              }
            }
          }
        }
      })
  )
})

const quota = (value) => {
  switch (value) {
    case "invitee":
      return "Kutsuvieras"
    case "open":
      return "Avoin"
    case "alumni":
      return "Alumni"
  }
}
const ticket_type = (value) => {
  switch (value) {
    case "student":
      return "Opiskelija"
    case "alumni":
      return "Alumni"
    case "supporter":
      return "Kannatuslippu"
  }
}
const main_course = (value) => {
  switch (value) {
    case "fish":
      return "Kala"
    case "vegetarian":
      return "Kasvis"
  }
}

const alcohol = (value) => {
  switch (value) {
    case "alcohol":
      return "Alkoholillinen"
    case "no_alcohol":
      return "Alkoholiton"
    case "only_wines":
      return "Vain viinit"
  }
}
const human_bool = (value) => {
  return value === "true" ? "Kyllä" : "Ei"
}

</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: var(--body-font);
  margin: 2rem auto;
  max-width: 700px;
  text-align: left;
  font-size: clamp(1rem, 3vmin,1.5rem);
}
</style>