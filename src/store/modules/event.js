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
    dispatch('todos/getTodo', null, { root: true });

    return EventService.createEvent(event).then(() => {
      commit('ADD_EVENT', event);
    });
  },
  fetchEvents({ commit }, { perPage, page }) {
    return EventService.getEvents(perPage, page).then(r => {
      commit('SET_EVENT_COUNTS', r.headers['x-total-count']);
      commit('ADD_EVENTS', r.data);
    });
  },
  fetchEvent({ commit, getters }, id) {
    const event = getters.getEventById(id);
    if (!event) {
      EventService.getEvent(id).then(response => {
        commit('SET_EVENT', response.data);
      });
    } else {
      commit('SET_EVENT', event);
    }
  }
};

export const getters = {
  getEventById: s => id => s.events.find(ev => ev.id === id)
};
