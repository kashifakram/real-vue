import RegisterationService from '@/services/RegisterationService.js';

function setUserCreds(userData) {
  localStorage.setItem('user', JSON.stringify(userData));
  RegisterationService.apiClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${userData.token}`;
}

export const state = {
  user: null
};

export const mutations = {
  SET_USER_DATA(state, payload) {
    state.user = payload;
    setUserCreds(payload);
  },

  CLEAR_USER_DATA() {
    localStorage.removeItem('user');
    location.reload();
  }
};

export const actions = {
  register({ commit }, creds) {
    return RegisterationService.registerUser(creds).then(({ data }) => {
      commit('SET_USER_DATA', data);
      console.log(data);
    });
  },

  login({ commit }, creds) {
    return RegisterationService.loginUser(creds).then(r => {
      commit('SET_USER_DATA', r.data);
      console.log('User: ', r.data);
    });
  },

  logout({ commit }) {
    commit('CLEAR_USER_DATA');
  }
};

export const getters = {
  isLoggedIn(state) {
    return !!state.user;
  }
};
