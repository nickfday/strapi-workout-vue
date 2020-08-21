import Vue from 'vue';
import VueRouter from 'vue-router';
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
    meta: { requriesAuth: true },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next('/');
  }
  next();
});

export default router;
