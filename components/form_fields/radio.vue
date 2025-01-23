<template>
  <fieldset>
    <legend>{{name}}<span v-if=required class="required">*</span></legend>
    <div class="radio_select">
      <label v-for="choice in choices" :for="choice.value" :key="choice.value">
        <input :id="choice.value" type="radio" v-model="model" :value="choice.value">
        {{$t(choice.text.split(':')[1])}}
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
interface Choice {
  text: string;
  value: string;
}
const props = defineProps({
  field_key: String,
  required: Boolean,
  name: String,
  choices: Array<Choice>,
})
const model = defineModel()
</script>


<style scoped>
fieldset {
  border: 0;
  width: auto;
}
legend {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-size: clamp(1rem, 3vmin, 1.2rem);
  padding: 0.5em;
}
label {
  display: block;
  text-align: center;
  font-family: var(--body-font);
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
.radio_select {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
}

input[type=radio]:checked {
  accent-color: var(--primary);
}

.required {
  vertical-align: top;
  color: var(--nav1);
}

</style>