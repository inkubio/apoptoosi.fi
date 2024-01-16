<template>
  <div>
    <p>{{page.translations[0].success_text}}</p>
    <p>Ilmoittauduit seuraavilla tiedoilla:</p>
    <ul>
      <li>Kiintiö: {{ quota($route.query.quota) }}</li>
      <li>Nimi: {{$route.query.first_name}} {{$route.query.last_name}}</li>
      <li>Sähköposti: {{$route.query.email}}</li>
      <li>Opiskeluiden aloitusvuosi: {{$route.query.fuksivuosi}}</li>
      <li>Lipputyyppi: {{ticket_type($route.query.ticket_type)}}</li>
      <li>Erityisruokavaliot: {{$route.query.diet ?? "-"}}</li>
      <li>Pääruoka: {{main_course($route.query.main_course)}}</li>
      <li>Alkoholi: {{alcohol($route.query.alcohol)}}</li>
      <li>Avecin nimi: {{$route.query.avec ?? "-"}}</li>
      <li>Pöytäseuruetoive: {{$route.query.table_group ?? "-"}}</li>
      <li>Edustamani taho: {{$route.query.organisation ?? "-"}}</li>
      <li>Esitän tervehdyksen cocktailtilaisuudessa: {{human_bool($route.query.gift)}}</li>
      <li>Ostan sillislipun: {{human_bool($route.query.sillis)}}</li>
    </ul>
  </div>
</template>

<script setup>
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
    case "student":
      return "Opiskelija"
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
p {
  font-family: var(--body-font);
  text-align: center;
  margin: 2rem auto;
  font-size: clamp(1rem, 3vmin,1.5rem);
  max-width: 700px;
}
ul {
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