<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select v-on="listeners" :value="value" @input="updateValue" v-bind="$attrs">
            <option v-for="op in options" :key="op" :value="op" :selected="op === value" >{{ op }}</option>
        </select>
    </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js';
export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>