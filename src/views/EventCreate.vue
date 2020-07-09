<template>
    <div>
        <h1>Create an Event</h1>
        <form @submit.prevent="createEvent">
            <label>Select a category</label>
            <select v-model="event.category">
                <option v-for="cat in categories" :key="cat">{{ cat }}</option>
            </select>

            <h3>Name & describe your event</h3>
            <div class="field">
                <label>Title</label>
                <input type="text" v-model="event.title" placeholder="Event Title">
            </div>

            <div class="field">
                <label>Description</label>
                <input type="text" v-model="event.description" placeholder="Event Description">
            </div>

            <h3>Where is your event?</h3>
            <div class="field">
                <label>Location</label>
                <input type="text" v-model="event.location" placeholder="Event Location">
            </div>

            <h3>When is your event?</h3>
            <div class="field">
                <label>Date</label>
                <datepicker v-model="event.date" placeholder="Select Date"></datepicker>
            </div>
            <div class="field">
                <label>Select Time</label>
                <select v-model="event.time">
                    <option v-for="t in times" :key="t"> {{ t }} </option>
                </select>
            </div>

            <input type="submit" class="button -fill-gradient" value="Submit">
        </form>
    </div>
</template>
 
<script>
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) times.push(i + ':00');
    return {
      times,
      categories: this.$store.state.categories.categories,
      event: this.createFreshEvent()
    };
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          });
          this.event = this.createFreshEvent();
        })
        .catch(() => {});
    },
    createFreshEvent() {
      const user = this.$store.state.user.user;
      const eventId = Math.floor(Math.random() * 10000000);
      return {
        id: eventId,
        user: user,
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
        organizer: { user },
        category: '',
        attendees: []
      };
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
