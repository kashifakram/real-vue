<template>
  <div>
    
    <template v-if="source === 'unauthorized'">
      <h1>You're NOT allowed to be here</h1>
      <router-link :to='{ name: "event-list" }'> Home </router-link>
    </template>
    <template v-else>
      <h1>You're lost!</h1>
      <h2> The {{ source.toUpperCase() }} you're looking for is not available.</h2>
      <router-link :to='{ name: "event-list" }'> Home </router-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: 'link',
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>