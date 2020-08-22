import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import NProgress from 'nprogress'; // <--- include the library

import Home from '../views/Home.vue';
import Exercises from '../views/exercises';
import ExerciseDetail from '../views/exercises/exerciseDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/exercises',
    name: 'exercises',
    component: Exercises,
  },
  {
    path: '/exercise/:id',
    name: 'exerciseDetail',
    component: ExerciseDetail,
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/auth/login.vue'),
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('../views/auth/register.vue'),
  },
  {
    path: '/athlete/dashboard',
    name: 'Dashboard',
    component: () => import('../views/athlete/dashboard.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/athlete/activity-history',
    name: 'ActivityHistory',
    component: () => import('../views/athlete/activity-history.vue'),
    meta: { requriesAuth: true },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = store.getters['loggedIn'];

  if (!to.matched.length) {
    next('/404');
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !loggedIn
  ) {
    console.log('Forbidden');
    next('/auth/login');
  } else {
    // Start the route progress bar.
    NProgress.start();
    next();
  }
});
router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
