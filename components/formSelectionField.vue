<template>
  <fieldset>
    <legend>{{name}}{{required ? "*" :""}}</legend>
    <div class="options_container">
      <div v-for="choice in choices" class="inline-selection">
        <input type="radio" :id="choice.value" :value="choice.value" :name="'group' + `${field_key}`"
               @input="$emit('update:modelValue', $event.target.value)" :required=required />
        <label :for="choice.value">{{choice.text === "yes" ? "Kyllä" : "Ei"}}</label>
      </div>
    </div>

  </fieldset>
</template>

<script setup>
const props = defineProps({
  field_key: String,
  required: Boolean,
  name: String,
  choices: Array,
})
</script>

<style scoped>
fieldset {
  border: 0;
}
legend {
  width: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-family: var(--body-font);
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
label {
  font-family: var(--body-font);
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
.inline-selection {
  display: inline;
}
.options_container {
  display: flex;
  gap: 1rem;
}
</style>