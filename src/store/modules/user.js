import axios from 'axios';

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    LOGIN: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            'https://strapi-workout-backend.herokuapp.com/auth/local',
            payload,
          )
          .then(({ data, status }) => {
            if (status === 200) {
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
        axios
          .post(
            'https://strapi-workout-backend.herokuapp.com/auth/local/register',
            payload,
          )
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
  },
};
