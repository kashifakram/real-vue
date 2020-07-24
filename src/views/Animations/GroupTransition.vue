<template>
    <div>
        <input type="text" v-model="newContact" placeholder="Name">
        <br />
        <br />
        <BaseButton @click="addContact" buttonClass="-fill-gradient">Add Contact</BaseButton>
<br />
        <br />
        <BaseButton @click="sortContacts" buttonClass="-fill-gradient">Sort</BaseButton>
        <transition-group tag="ul" name="slide-up" appear>
            <li v-for="contact in contacts" :key="contact"> {{ contact }} </li>
        </transition-group>
    </div>
</template>

<script>
export default {
  data() {
    return {
      newContact: '',
      contacts: ['Kashif', 'Asif', 'Muzammal']
    };
  },
  methods: {
    addContact() {
      this.contacts.push(this.newContact);
      this.newContact = '';
    },
    sortContacts() {
      this.contacts.sort();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>