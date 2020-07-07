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
    ]
  },
  mutations: {
    ADD_EVENT(st, payload) {
      st.events.push(payload);
    },
    ADD_EVENTS(st, payload) {
      st.events = payload;
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.createEvent(event).then(() => {
        commit('ADD_EVENT', event);
      });
    },
    fetchEvents({ commit }) {
      return EventService.getEvents().then(r => {
        commit('ADD_EVENTS', r.data);
      });
    }
  },
  getters: {
    totalCategories: s => s.categories.length,
    completedTasks: s => s.todos.filter(td => td.done),
    activeTasks: s => s.todos.filter(td => !td.done),
    totalCompletedTasks: (s, g) => g.completedTasks.length,
    totalActiveTasks: (s, g) => s.todos.length - g.totalCompletedTasks,
    getTaskById: s => id => s.todos.find(td => td.id === id)
  }
});
