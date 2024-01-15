<template>
  <form class="container" @submit.prevent="handleSubmit">
    <!--<div v-for="field in fields">

      <form-text-field v-if="field.meta.interface === 'input'" :field_key="field.field"
                       :name="field.meta?.translations[0]?.translation" :required="field.meta.required"
                       :placeholder="field.meta.options?.placeholder"
                       v-model="form[`${field.field}`]"
      />
      <form-selection-field v-else-if="field.meta.interface === 'select-radio'" :field_key="field.field"
                            :name="field.meta?.translations[0]?.translation" :required="field.meta.required"
                            :choices="field.meta.options.choices"
                            v-model="form[`${field.field}`]"
      />
      <p v-else>Not implemented</p>
    </div>-->
    <label for="firstname">Etunimi*</label>
    <input type="text" id="firstname" name="firstname" v-model="form.first_name" placeholder="Teemu" required>

    <label for="lastname">Sukunimi*</label>
    <input type="text" id="lastname" name="lastname" v-model="form.last_name" placeholder="Teekkari" required>

    <label for="email">Sähköposti*</label>
    <input type="email" id="email" name="email" v-model="form.email" placeholder="teemu.teekkari@esimerkki.fi" required>

    <label for="fuksivuosi">Fuksivuosi*</label>
    <input type="number" id="fuksivuosi" name="fuksivuosin" v-model="form.fuksivuosi" placeholder="2018" required>

    <fieldset>
      <legend>Alumni vai opiskelija*</legend>
      <div class="radio_select">
        <label for="alumni_yes">
          <input type="radio" id="alumni_yes" value="student" name="alumni" v-model="form.participant_type" required>
          Opiskelija
        </label>
        <label for="alumni_no">
          <input type="radio" id="alumni_no" value="alumni" name="alumni" v-model="form.participant_type">
          Alumni
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Ostan kannatuslipun*</legend>
      <div class="radio_select">
        <label for="support_yes">
          <input type="radio" id="support_yes" value="yes" name="support_ticket" v-model="form.supporter_ticket" required>
          Kyllä
        </label>
        <label for="support_no">
          <input type="radio" id="support_no" value="no" name="support_ticket" v-model="form.supporter_ticket" required>
          Ei
        </label>
      </div>
    </fieldset>

    <label for="diet">Erityisruokavaliot</label>
    <input type="text" id="diet" name="diet" v-model="form.diet">

    <fieldset>
      <legend>Pääruoka*</legend>
      <div class="radio_select">
        <label for="main_course_yes">
          <input type="radio" id="main_course_yes" value="fish" name="main_course" v-model="form.main_course" required>
          Kala
        </label>
        <label for="main_course_no">
          <input type="radio" id="main_course_no" value="vegetarian" name="main_course" v-model="form.main_course" required>
          Kasvis
        </label>
      </div>
    </fieldset>

    <fieldset>
      <legend>Alkoholi*</legend>
      <div class="radio_select">
        <label for="alcohol_yes">
          <input type="radio" id="alcohol_yes" value="alcohol" name="alcohol"  v-model="form.alcohol" required>
          Alkoholillinen
        </label>
        <label for="alcohol_no">
          <input type="radio" id="alcohol_no" value="no_alcohol" name="alcohol" v-model="form.alcohol" required>
          Alkoholiton
        </label>
        <label for="only_wines">
          <input type="radio" id="only_wines" value="only_wines" name="alcohol" v-model="form.alcohol" required>
          Vain viinit
        </label>
      </div>
    </fieldset>

    <label for="avec">Avecin nimi</label>
    <input type="text" id="avec" name="avec" v-model="form.avec">

    <label for="table_group">Pöytäseuruetoive</label>
    <input type="text" id="table_group" name="table_group" v-model="form.table_group">

    <fieldset>
      <legend>Annan lahjan</legend>
      <div class="radio_select">
        <label for="gift_yes">
          <input type="radio" id="gift_yes" value=true name="gift" v-model="form.gift">
          Kyllä
        </label>
        <label for="gift_no">
          <input type="radio" id="gift_no" value=false name="gift" v-model="form.gift">
          Ei
        </label>
      </div>
    </fieldset>

    <label for="organisation">Edustamani taho</label>
    <input type="text" id="organisation" name="organisation" v-model="form.organisation">

    <fieldset>
      <legend>Ostan sillislipun*</legend>
      <div class="radio_select">
        <label for="sillis_yes">
          <input type="radio" id="sillis_yes" value=true name="sillis" v-model="form.sillis">
          Kyllä
        </label>
        <label for="sillis_no">
          <input type="radio" id="sillis_no" value=false name="sillis" v-model="form.sillis">
          Ei
        </label>
      </div>
    </fieldset>

    <button type="submit">Lähetä</button>
  </form>

</template>

<script setup>
const { $directus, $createItem} = useNuxtApp()

const props = defineProps({
  fields: Object,
  ticket_type: String,
  reservation_time: String,
})

const form = useState('form', () => {
  return {
    'ticket_type': props.ticket_type,
    'participant_type': props.ticket_type,
  }
})

const router = useRouter();

const handleSubmit = async () => {
  form.value["ticket_type"] = props.ticket_type
  console.log(form.value)
  const {data: res} = await useAsyncData('send_signup', () => {
    return $directus.request(
        $createItem('participants', form.value)
    )
  })

  if (res.value.ok) {
    await router.push({path: "signup/success", query: form.value})
  } else {
    console.log(res)
    alert(`Signup failed with status code ${res.status}, check browser log. If problem persists contact apoptoosi@inkubio.fi`)
  }




}

</script>

<style scoped>
.container {
  font-family: var(--body-font);
  font-size: clamp(1em, 3vmin,1.5rem);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-items: center;
  padding: 2rem 0;
  gap: 1rem;
}

input[type=text], input[type=email], input[type=number] {
  border: none;
  font-size: clamp(1rem, 3vmin, 1.2rem);
  padding: 0.5em;
  border-radius: 0.5em;
  appearance: textfield;
}

input:focus {
  outline: 2px solid var(--primary);
}

fieldset {
  border: 0;
  width: auto;
}
legend {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.radio_select {
  display: flex;
  justify-content: space-evenly;
}

button {
  text-decoration: none;
  box-shadow: none;
  color: white;
  padding: 0.5em;
  background-color: var(--secondary);
  font-size: clamp(1em, 3vmin,1.5rem);
  font-weight: lighter;
  font-family: var(--body-font);
  border: none;
  transition: 0.3s;
}
button:hover {
  opacity: 0.5;
}

</style>