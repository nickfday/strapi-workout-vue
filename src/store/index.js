import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import fetchService from '@/services/fetchService';

// import User from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    loggedIn(state) {
      console.log(state);
      return !!state.user;
    },
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.jwt}`;
    },
  },
  actions: {
    // login({ commit }, credentials) {
    //   return axios
    //     .post(
    //       'https://strapi-workout-backend.herokuapp.com/auth/local',
    //       credentials,
    //     )
    //     .then(({ data }) => {
    //       commit('SET_USER_DATA', data);
    //     });
    // },
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            'https://strapi-workout-backend.herokuapp.com/auth/local',
            payload,
          )
          .then(({ data, status }) => {
            if (status === 200) {
              console.log(data);
              commit('SET_USER_DATA', data);
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    REGISTER: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        fetchService
          .postStrapiData('/auth/local/register', payload)
          .then(({ data, status }) => {
            if (status === 201) {
              resolve(true);
            }
          })
          .catch((error) => {
            reject(error);
          });
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
    },
  },
});
