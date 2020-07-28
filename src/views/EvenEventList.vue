<template>
  <div>
    <h1>EVEN EVENTS</h1>
    <transition-group tag="ul" appear name="slide-up">
    <li v-for="(e) in evenEvents" :key="e.id" style="list-style:none">
        <EventCard  :event="e" />
      <!-- <EventCardNoVuex :event="e" /> -->
    </li>
    </transition-group>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue';
import { mapState } from 'vuex';
// import EventCardNoVuex from '@/components/EventCard_No_Vuex.vue';
import store from '@/store/store';

export default {
  created() {
    store.dispatch('event/fetchEvenEvents').catch(error => {
      if (error.response && error.response.status === 404) {
        const errorNoti = {
          type: 'error',
          message: 'There is an error while fetching events: ' + error.message
        };
        store.dispatch('notification/add', errorNoti, { root: true });
        this.$router.push({ name: '404', params: { source: 'page' } });
      } else if (error.response.status === 401)
        this.$router.push({ name: '404', params: { source: 'unauthorized' } });
      else this.$router.push({ name: 'network-issue' });
    });
  },
  components: {
    EventCard
    // EventCardNoVuex
  },
  computed: {
    ...mapState({ evenEvents: state => state.event.evenEvents[0] })
  }
};
</script>
