<template>
    <div>
        <form @submit.prevent="login">
            <h3>Login</h3>
            <BaseInput  type="text" placeholder="Email" label="Email" v-model="user.email" class="field" />
            <BaseInput  type="password" placeholder="Password" label="Password" v-model="user.password" class="field" />

              <BaseButton type="submit" buttonClass="-fill-gradient">Login</BaseButton>
        </form>
        <p>{{ error }}</p>
    </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      error: ''
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', this.user)
        .then(() => {
          this.$router.push({ name: 'even-events' });
        })
        .catch(e => {
          this.error = e.response.data;
          console.log(e.response);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>