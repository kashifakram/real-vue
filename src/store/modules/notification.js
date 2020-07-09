export const namespaced = true;

export const state = {
  notifications: []
};

let nextId = 1;

export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++
    });
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    );
  }
};
export const actions = {
  add({ commit }, notification) {
    commit('PUSH', notification);
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove);
  }
};

// export const namespaced = true;

// export const state = {
//   notifications: []
// };

// let nextId = 1;

// export const mutations = {
//   PUSH(state, payload) {
//     state.notifications.push({
//       ...payload,
//       id: nextId++
//     });
//   },
//   DELETE(state, payload) {
//     state.notifications = state.notifications.filter(n => n.id !== payload.id);
//   }
// };

// export const actions = {
//   add({ commit }, noti) {
//     commit('PUSH', noti);
//   },
//   remove({ commit }, notiToRemove) {
//     commit('DELETE', notiToRemove);
//   }
// };
