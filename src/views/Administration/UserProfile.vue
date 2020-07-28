<template>
    <div>
        <h2>Welcome {{ username }} </h2>
        <h2> <span>{{ user.name }}</span></h2>
        <h3><span>{{ user.email }}</span></h3>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: ''
      }
    };
  },
  props: ['username']
};
</script>

<style lang="scss" scoped>
</style>