<template>
    <nav class="nav">
        <router-link :to= "{ name: 'event-list' }" class="brand">World Events</router-link>
        <div id="nav">
          <router-link :to="{ name: 'event-create' }">Create</router-link> |
          <template v-if="isLoggedIn">
            <router-link :to="{ name: 'even-events' }">EVENS</router-link> |
          </template>
          <template v-if="!isLoggedIn">
            <router-link :to="{ name: 'login' }">Login</router-link> |
          </template>
          <template v-else>
            <a @click.prevent="logout">Logout</a> |
          </template>
          <router-link :to="{ name: 'register' }">Register</router-link>
        </div>
    </nav>
</template>

<script>
import { authComputed } from '@/helpers/logged.js';
export default {
  computed: {
    ...authComputed
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}
</style>