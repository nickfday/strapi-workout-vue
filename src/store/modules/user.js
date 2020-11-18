import axios from 'axios';
export const state = {
    user: null
};
export const mutations = {
    SET_USER_DATA(state, userData) {
        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.jwt}`;
    }
};
export const actions = {
    LOGIN({ commit }, credentials) {
        return axios
            .post('https://strapi-workout-backend.herokuapp.com/auth/local', credentials)
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
            .post('https://strapi-workout-backend.herokuapp.com/auth/local/register', credentials)
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
};
export const getters = {
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
};
//# sourceMappingURL=user.js.map