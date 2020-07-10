import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  totalEvents: 0
};

export const mutations = {
  ADD_EVENT(st, payload) {
    st.events.push(payload);
  },
  ADD_EVENTS(st, payload) {
    st.events = payload;
  },
  SET_EVENT_COUNTS(st, payload) {
    st.totalEvents = parseInt(payload);
  },
  SET_EVENT(st, payload) {
    st.event = payload;
  }
};

export const actions = {
  createEvent({ commit, dispatch, rootState }, event) {
    console.log('Event user is ' + rootState.user.user.name);

    //second parameter is payload to send to action from other module
    dispatch('getTodo', null, { root: true });

    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);

        const successNoti = {
          type: 'success',
          message: 'Event ' + event.id + ' created successfully!'
        };
        dispatch('notification/add', successNoti, { root: true });
        console.log(successNoti);
      })
      .catch(e => {
        const errorNoti = {
          type: 'error',
          message: 'error creating event ' + event.title + ' ' + e.message
        };
        dispatch('notification/add', errorNoti, { root: true });
        console.log(errorNoti);
        throw e;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(r => {
        commit('SET_EVENT_COUNTS', r.headers['x-total-count']);
        commit('ADD_EVENTS', r.data);
      })
      .catch(e => {
        const errorNoti = {
          type: 'error',
          message: 'There is an error while fetching events: ' + e.message
        };
        dispatch('notification/add', errorNoti, { root: true });
      });
  },
  fetchEvent({ commit, dispatch }, id) {
    // const event = getters.getEventById(id);
    // if (!event) {
    return EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data);
      })
      .catch(e => {
        const errorNoti = {
          type: 'error',
          message: 'There is an error while fetching event: ' + e.message
        };
        dispatch('notification/add', errorNoti, { root: true });
      });
    // } else {
    //   commit('SET_EVENT', event);
  }
};

// export const getters = {
//   getEventById: s => id => s.events.find(ev => ev.id === id)
// };
