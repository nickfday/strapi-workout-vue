import fetchService from '@/services/fetchService';

export const state = {
  exercises: [],
  exercise: {},
  loading: true
};

export const actions = {
  // fetch exercises
  async FETCH_EXERCISES({ commit }: { commit: Function }) {
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
  // TODO: only fetch if not in router prop
  async FETCH_EXERCISE_DETAIL({ commit }: { commit: Function }) {
    try {
      const response = await fetchService.fetchData(
        `/exercises?slug=${window.location.href.substr(
          window.location.href.lastIndexOf('/') + 1
        )}`
      );
      commit('SET_EXERCISES_DETAIL', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  EXERCISE_DETAIL_NAVIGATE({ commit }, data) {
    console.log(data);
    commit('SET_EXERCISES_DETAIL', data);
  },
  //TODO: Check local storage
  CHECK_LOCAL_STORAGE_EXERCISES({ commit, dispatch }) {
    if (localStorage.exercises) {
      commit('SET_EXERCISES', localStorage.exercises);
    } else {
      dispatch('FETCH_EXERCISES');
    }
  }
  // FORMAT_EXERCISES({ commit, dispatch }) {}
};
export const mutations = {
  SET_EXERCISES(state, data) {
    console.log(data);
    state.exercises = data;
    state.loading = false;
  },
  SET_EXERCISES_DETAIL(state, data) {
    console.log(data);
    state.exercise = data[0];
    // state.loading = false;
  }
};
export const getters = {
  exercises(state) {
    return state.exercises;
  },
  exercise(state) {
    return state.exercise;
  }
};
