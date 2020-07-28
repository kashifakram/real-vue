<template>
    <div>
        <form @submit.prevent="register">
            <h3>Register</h3>
            <BaseInput  type="text" placeholder="Name" label="Name:" v-model="name" class="field" />
            <BaseInput  type="text" placeholder="Email" label="Email:" v-model="email" class="field" />
            <BaseInput  type="password" placeholder="Password" label="Password:" v-model="password" class="field" />

            <BaseButton type="submit" buttonClass="-fill-gradient">Register</BaseButton>
        </form>
        <ul>
            <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: []
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'even-events' });
        })
        .catch(e => (this.errors = e.response.data.errors));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>