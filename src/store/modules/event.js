import EventService from '@/services/EventService.js';

export const namespaced = true;

export const state = {
  events: [],
  evenEvents: [],
  event: {},
  perPage: 4,
  totalEvents: 0
};

export const mutations = {
  ADD_EVENT(st, payload) {
    st.events.push(payload);
  },
  ADD_EVENTS(st, payload) {
    st.events = payload;
  },
  ADD_EVEN_EVENTS(st, payload) {
    st.evenEvents.push(payload);
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
  fetchEvents({ commit, state }, { page }) {
    return EventService.getEvents(state.perPage, page).then(r => {
      console.log(r.data);
      commit('SET_EVENT_COUNTS', r.headers['x-total-count']);
      commit('ADD_EVENTS', r.data);
    });
  },
  fetchEvenEvents({ commit }) {
    return EventService.getEvenEvents().then(r => {
      console.log(r.data.events);
      commit('ADD_EVEN_EVENTS', r.data.events);
    });
  },
  fetchEvent({ commit, dispatch }, id) {
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
  },
  fetchEventNoVuex({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (!event) {
      return EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data);
        return response.data;
      });
    } else {
      commit('SET_EVENT', event);
      return event;
    }
  }
};

export const getters = {
  getEventById: s => id => s.events.find(ev => ev.id === id)
};
