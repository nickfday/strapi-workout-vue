import Vue from 'vue';
import Vuex from 'vuex';

// import axios from 'axios';
// import fetchService from '@/services/fetchService';

import * as user from './modules/user';
import * as exercise from './modules/exercise';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    exercise
  }
});
