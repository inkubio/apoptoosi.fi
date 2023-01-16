<template>
  <div>
    <label :for="field_key">{{name}}{{required ? "*" :""}}</label>
    <input type="text" :name="field_key" :id="field_key" :placeholder="placeholder"
           :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<script setup>
const props = defineProps({
  field_key: String,
  required: Boolean,
  name: String,
  placeholder: String,
  modelValue: String,
})
const emits = defineEmits(['update:modelValue'])
</script>

<style scoped>
label {
  display: block;
  text-align: center;
  font-family: var(--body-font);
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
input[type=text] {
  border: none;
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
input:focus {
  outline: none;
}

</style>