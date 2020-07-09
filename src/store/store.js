import Vue from 'vue';
import Vuex from 'vuex';
import * as user from '@/store/modules/user.js';
import * as event from '@/store/modules/event.js';
import * as todos from '@/store/modules/todos.js';
import * as categories from '@/store/modules/categories.js';
import * as notification from '@/store/modules/notification.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    categories,
    todos,
    notification
  }
});
