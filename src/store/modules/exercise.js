import fetchService from '@/services/fetchService';

export const state = {
  exercises: [],
  loading: true
};

export const actions = {
  // fetch exercises
  async FETCH_EXERCISES({ commit }) {
    console.log('FETCH');
    try {
      const response = await fetchService.fetchData('/exercises');

      localStorage.setItem('exercises', response.data);
      commit('SET_EXERCISES', response.data);
      // return response.data;
    } catch (error) {
      console.log(error);
    }
  },
  //TODO: Check local storage
  CHECK_LOCAL_STORAGE_EXERCISES({ commit, dispatch }) {
    if (localStorage.exercises) {
      commit('SET_EXERCISES', localStorage.exercises);
    } else {
      dispatch('FETCH_EXERCISES');
    }
  }
};
export const mutations = {
  SET_EXERCISES(state, data) {
    console.log(data);
    state.exercises = data;
    state.loading = false;
  }
};
export const getters = {
  exercises(state) {
    return state.exercises;
  }
};
