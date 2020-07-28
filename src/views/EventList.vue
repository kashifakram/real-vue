<template>
  <div>
    <h1>Event for {{ user.user.name }} </h1>
    <transition-group tag="ul" appear name="slide-up">
    <li v-for="e in event.events" :key="e.id" style="list-style:none">
        <EventCard  :event="e" />
      <EventCardNoVuex :event="e" />
    </li>
    </transition-group>
    <template v-if="page != 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev">Prev Page</router-link>
      <template v-if="hasNextPage"> | </template>
    </template> 
      <router-link v-if="hasNextPage" :to="{name: 'event-list', query: {page: page + 1}}" rel="next">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import EventCardNoVuex from '@/components/EventCard_No_Vuex.vue';
import { mapState } from 'vuex';
import store from '@/store/store';

function getPageEvents(to, next) {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch('event/fetchEvents', { page: currentPage })
    .then(() => {
      to.params.page = currentPage;
      next();
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        const errorNoti = {
          type: 'error',
          message: 'There is an error while fetching events: ' + error.message
        };
        store.dispatch('notification/add', errorNoti, { root: true });
        next({ name: '404', params: { source: 'page' } });
      } else next({ name: 'network-issue' });
    });
}

export default {
  data() {
    return {
      showEvent: false,
      evenEvents: false
    };
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  components: {
    EventCard,
    EventCardNoVuex
  },
  beforeRouteEnter(to, from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getPageEvents(to, next);
  },
  computed: {
    loadedEvents() {
      return this.event.perPage * this.page;
    },
    hasNextPage() {
      return this.loadedEvents < this.event.totalEvents;
    },
    ...mapState(['event', 'user'])
  }
};
</script>
