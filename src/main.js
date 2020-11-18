import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueAnalytics from 'vue-analytics';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'nprogress/nprogress.css';
import '@/assets/css/style.css';
import vuetify from './plugins/vuetify';
//TODO: Remove bootstrap
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.use(VueAnalytics, {
    id: 'UA-25461353-2'
});
new Vue({
    router,
    store,
    created() {
        const userString = localStorage.getItem('user');
        if (userString) {
            const userData = JSON.parse(userString);
            this.$store.commit('SET_USER_DATA', userData);
        }
    },
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
//# sourceMappingURL=main.js.map