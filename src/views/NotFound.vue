<template>
  <div>
    <h1>You're lost!</h1>
    <h2> The {{ source }} you're looking for is not available.</h2>
    <router-link :to='{ name: "event-list" }'> Home </router-link>
  </div>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>