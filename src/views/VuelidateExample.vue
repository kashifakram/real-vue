<template>
    <form @submit.prevent="submit">
        <input type="email" placeholder="Enter Email" v-model="email" 
        @focus="$v.email.$touch()" 
        :class="{error: $v.email.$error}">
        <div v-if="$v.email.$error">
            <p v-if="!$v.email.email" class="errorMessage">Please enter VALID email</p>
            <p v-if="!$v.email.required" class="errorMessage">Please enter email</p>
        </div>
        <button :disabled="$v.$invalid" type="submit">Submit</button>
        <p v-if="$v.$anyError" class="errorMessage">Please correct form values</p>
    </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
export default {
  validations: {
    email: {
      required,
      email
    }
  },
  data() {
    return {
      email: null
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) console.log('form submitted ' + this.email);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>