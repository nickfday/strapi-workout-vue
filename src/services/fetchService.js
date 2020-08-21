import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://strapi-workout-backend.herokuapp.com',
});

export default {
  fetchStrapiData(endpoint) {
    return apiClient.get(endpoint);
  },
  postStrapiData(endpoint, payload) {
    return apiClient.post(endpoint, payload);
  },
};
