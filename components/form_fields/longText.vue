<template>
  <div>
    <label :for="field_key">{{name}}<span v-if=required class="required">*</span></label>
    <textarea name="field_key" :id="field_key" :placeholder="placeholder"
           v-model="model" :required="required"></textarea>
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
textarea {
  border: none;
  font-size: clamp(1rem, 3vmin, 1.2rem);
  padding: 0.5em;
  border-radius: 0.5em;
  appearance: textfield;
  width: 30ch;
  height: 4em;
  max-height: 400px;
  max-width: 500px;
  outline: 2px solid #c1c5c9;
}
textarea:focus {
  outline: 2px solid var(--primary);
}

.required {
  vertical-align: top;
  color: var(--nav1);
}

</style>