<template>
  <div>
    <label :for="field_key">{{name}}<span v-if=required class="required">*</span></label>
    <input :type="field_key === 'email' ? 'email' : 'text'" :name="field_key" :id="field_key" :placeholder="placeholder"
           :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :required="required">
  </div>
</template>

<script setup lang="ts">
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
input[type=text], input[type=email] {
  border: none;
  font-size: clamp(1rem, 3vmin, 1.2rem);
}
input:focus {
  outline: none;
}

.required {
  vertical-align: top;
  color: var(--nav1);
}

</style>