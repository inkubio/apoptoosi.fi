<template>
  <div>
    <label :for="field_key">{{name}}<span v-if=required class="required">*</span></label>
    <input :type="field_key === 'email' ? 'email' : 'text'" :name="field_key" :id="field_key" :placeholder="placeholder"
           v-model="model" :required="required">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  field_key: String,
  required: Boolean,
  name: String,
  placeholder: String,
})
const model = defineModel()
</script>

<style scoped>
label {
  display: block;
  text-align: center;
  font-family: var(--body-font);
  font-size: clamp(1rem, 3vmin, 1.2rem);
  padding: 0.5em;
}
input[type=text], input[type=email], input[type=number] {
  border: none;
  font-size: clamp(1rem, 3vmin, 1.2rem);
  padding: 0.5em;
  border-radius: 0.5em;
  appearance: textfield;
  outline: 2px solid #c1c5c9;
  width: 30ch;
}

input:focus {
  outline: 2px solid var(--primary);
}

.required {
  vertical-align: top;
  color: var(--nav1);
}

</style>