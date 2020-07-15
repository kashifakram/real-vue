<template>
    <div>
        <h1>Create an Event</h1>
        <form @submit.prevent="createEvent">
            <BaseSelect label="Select Category" :options="categories" v-model="event.category"  class="field" 
            @blur="$v.event.category.$touch()" 
            :class="{ error: $v.event.category.$error}" />
            <template v-if="$v.event.category.$error">
              <p v-if="!$v.event.category.required" class="errorMessage">Category is required</p>
            </template>

            <h3>Name & describe your event</h3>
            <BaseInput  type="text" placeholder="Enent Title" label="Title" v-model="event.title" class="field" 
            @blur="$v.event.title.$touch()" 
            :class=" { error: $v.event.title.$error } " />
            <template v-if="$v.event.title.$error">
              <p v-if="!$v.event.title.required" class="errorMessage">Title is required</p>
            </template>

            <BaseInput  type="text" placeholder="Enent Description" label="Description" v-model="event.description" class="field" @blur="$v.event.description.$touch()" 
            :class=" { error: $v.event.description.$error } " />
            <template v-if="$v.event.description.$error">
              <p v-if="!$v.event.description.required" class="errorMessage">Description is required</p>
            </template>

            <h3>Where is your event?</h3>
            <BaseInput  type="text" placeholder="Enent Location" label="Location" v-model="event.location" class="field" @blur="$v.event.location.$touch()" 
            :class=" { error: $v.event.location.$error } " />
            <template v-if="$v.event.location.$error">
              <p v-if="!$v.event.location.required" class="errorMessage">Location is required</p>
            </template>

            <h3>When is your event?</h3>
            <div class="field">
            <label>Date</label>
            <datepicker
              v-model="event.date"
              placeholder="Select Date"
              :input-class="{ error: $v.event.date.$error }" 
              @opened="$v.event.date.$touch()"
            ></datepicker>
          </div>
          <template v-if="$v.event.date.$error">
            <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
          </template>

            <BaseSelect label="Select Time" :options="times" v-model="event.time"  class="field" 
            :class="{ error: $v.event.time.$error }" 
            @blur="$v.event.time.$touch()" />
            <template v-if="$v.event.time.$error">
              <p v-if="!$v.event.time.required" class="errorMessage">Time is required</p>
            </template>

            <BaseButton type="submit" :disabled="$v.$anyError" buttonClass="-fill-gradient">Submit Form</BaseButton>
            <p v-if="$v.$anyError" class="errorMessage">Please fill required field(s)</p>
        </form>
    </div>
</template>
 
<script>
import Datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';
import { required } from 'vuelidate/lib/validators';

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
  validations: {
    event: {
      title: { required },
      date: { required },
      time: { required },
      location: { required },
      description: { required },
      category: { required }
    }
  },
  created() {
    this.event = this.createFreshEvent();
  },
  methods: {
    clicked() {
      alert('clicked');
    },
    createEvent() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        NProgress.start();
        this.$store
          .dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            });
          })
          .catch(() => {
            NProgress.done();
          });
      }
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
