import Vue from 'vue';
import Vuex from 'vuex';
import EventService from '@/services/EventService.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123',
      name: 'Adam Jahr'
    },
    events: [],
    event: {},
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
      { id: 5, text: '...', done: true },
      { id: 6, text: '...', done: false }
    ],
    totalEvents: 0
  },
  mutations: {
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
  },
  actions: {
    createEvent({ commit }, event) {
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
  },
  getters: {
    totalCategories: s => s.categories.length,
    completedTasks: s => s.todos.filter(td => td.done),
    activeTasks: s => s.todos.filter(td => !td.done),
    totalCompletedTasks: (s, g) => g.completedTasks.length,
    totalActiveTasks: (s, g) => s.todos.length - g.totalCompletedTasks,
    getTaskById: s => id => s.todos.find(td => td.id === id),
    getEventById: s => id => s.events.find(ev => ev.id === id)
  }
});
