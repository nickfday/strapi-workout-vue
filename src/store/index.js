import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
// import fetchService from '@/services/fetchService';

// import User from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn(state) {
      console.log(state);
      return !!state.user;
    },
    getUserData(state) {
      return state.user.user;
    },
    getJwtToken(state) {
      return state.user.jwt;
    },
    getUserId(state) {
      return state.user.user.id;
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.jwt}`;
    }
  },
  actions: {
    LOGIN({ commit }, credentials) {
      return axios
        .post(
          'https://strapi-workout-backend.herokuapp.com/auth/local',
          credentials
        )
        .then(({ data, status }) => {
          if (status === 200) {
            commit('SET_USER_DATA', data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    REGISTER({ commit }, credentials) {
      return axios
        .post(
          'https://strapi-workout-backend.herokuapp.com/auth/local/register',
          credentials
        )
        .then(({ data, status }) => {
          if (status === 201) {
            commit('SET_USER_DATA', data);
            alert('ACCOUNT CREATED');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    CLEAR_USER_DATA(state) {
      state.user = null;
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = null;
    },
    LOGOUT() {
      localStorage.removeItem('user');
      location.reload();
    }
  }
});
