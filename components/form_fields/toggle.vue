<template>
  <fieldset>
    <legend>{{name}}<span v-if=required class="required">*</span></legend>
    <div class="radio_select">
      <label :for="`${field_key}-yes`">
        <input :name="name" :id="`${field_key}-yes`" type="radio" v-model="model" value=true :required="required"/>
        {{$t("yes")}}
      </label>
      <label :for="`${field_key}-no`">
        <input :name="name" :id="`${field_key}-no`" type="radio" v-model="model" value=false :required="required">
        {{$t("no")}}
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
const props = defineProps({
  field_key: String,
  required: Boolean,
  name: String,
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