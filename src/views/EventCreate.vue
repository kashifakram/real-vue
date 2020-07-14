<template>
    <div>
        <h1>Create an Event</h1>
        <form @submit.prevent="createEvent">
            <BaseSelect label="Select Category" :options="categories" v-model="event.category"  class="field" />

            <h3>Name & describe your event</h3>
            <BaseInput  type="text" placeholder="Enent Title" label="Title" v-model="event.title" class="field" />

            <BaseInput  type="text" placeholder="Enent Description" label="Description" v-model="event.description" class="field" />

            <h3>Where is your event?</h3>
            <BaseInput  type="text" placeholder="Enent Location" label="Location" v-model="event.location" class="field" />

            <h3>When is your event?</h3>
            <div class="field">
                <label>Date</label>
                <datepicker v-model="event.date" placeholder="Select Date"></datepicker>
            </div>

            <BaseSelect label="Select Time" :options="times" v-model="event.time"  class="field" />

            <!-- <input type="submit" class="button -fill-gradient" value="Submit"> -->
            <BaseButton type="submit" buttonClass="-fill-gradient">Submit Form</BaseButton>
        </form>
    </div>
</template>
 
<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
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
      NProgress.start();
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          });
          this.event = this.createFreshEvent();
        })
        .catch(() => {
          NProgress.done();
        });
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
