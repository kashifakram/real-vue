<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="e in events" :key="e.id" :event="e" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
export default {
  components: {
    EventCard
  },
  created() {
    this.$store
      .dispatch('fetchEvents')
      .then(() => {
        console.log('All events loaded');
      })
      .catch(() => {
        console.log("Events can't be fetched at startup");
      });
  },
  computed: mapState(['events'])
};
</script>
