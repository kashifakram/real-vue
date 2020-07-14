<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <select :value="value" @input="updateValue" v-bind="$attrs">
            <option v-for="op in options" :key="op" :value="op" :selected="op === value" >{{ op }}</option>
        </select>
    </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>