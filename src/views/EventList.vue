<template>
  <div>
    <h1>Event Listing</h1>
    <EventCard v-for="e in events" :key="e.id" :event="e" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventService from '@/services/EventService';
export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(rsp => {
        this.events = rsp.data;
      })
      .catch(err => console.log(err));
  }
};
</script>
