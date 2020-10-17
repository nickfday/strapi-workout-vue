import axios from 'axios';

const apiClient = axios.create({
  //TODO: Use env file
  baseURL: `https://strapi-workout-backend.herokuapp.com`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  fetchData(path) {
    return apiClient.get(path);
  }
};
