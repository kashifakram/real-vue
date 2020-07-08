<template>
  <div>
    <h1>Event for {{ user.user.name }} </h1>
    <EventCard v-for="e in event.events" :key="e.id" :event="e" />
    <template v-if="page != 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev"> Prev Page  </router-link>
    </template> &nbsp;&nbsp;&nbsp;&nbsp;
    <template v-if="loadedEvents < event.totalEvents">
      <router-link :to="{name: 'event-list', query: {page: page + 1}}" rel="next"> Next Page  </router-link>
    </template>
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
      .dispatch('event/fetchEvents', { perPage: 3, page: this.page })
      .then(() => {
        console.log('All events loaded');
      })
      .catch(() => {
        console.log("Events can't be fetched at startup");
      });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    loadedEvents() {
      return 3 * this.page;
    },
    ...mapState(['event', 'user'])
  }
};
</script>
