<template>
  <div>
    <v-app-bar dark>
      <v-container>
        <v-row align="center">
          <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
          <v-toolbar-title>Workout Mentor</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn> -->

          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-account-box</v-icon>
              </v-btn>
            </template>

            <v-list>
              <router-link
                :to="item.slug"
                v-for="item in userMenuComputed"
                :key="item.title"
                @click.native="handleLogout(item.logout)"
              >
                <v-list-item>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </router-link>
            </v-list>
          </v-menu>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav>
        <v-list-item-group v-model="group" active-class="text--accent-4">
          <router-link
            :to="item.slug"
            v-for="item in navItems"
            :key="item.title"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item></router-link
          >
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
    drawer: false,
    navItems: [
      {
        title: 'Home',
        slug: '/',
        icon: 'mdi-home'
      },
      {
        title: 'Exercises',
        slug: '/exercises',
        icon: 'mdi-arm-flex'
      },
      {
        title: 'Routines',
        slug: '/routines',
        icon: 'mdi-book'
      },
      {
        title: 'Dashboard',
        slug: '/athlete/dashboard',
        auth: true
      }
    ],
    userMenu: [
      {
        title: 'Log In',
        slug: '/auth/login'
      },
      {
        title: 'Register',
        slug: '/auth/register'
      },
      {
        title: 'Dashboard',
        slug: '/athlete/dashboard',
        auth: true
      },
      {
        title: 'Logout',
        slug: '/athlete/dashboard',
        auth: true,
        logout: true
      }
    ]
  }),
  computed: {
    userMenuComputed: function() {
      return this.userMenu.filter((item) => {
        return this.$store.getters.loggedIn ? item.auth : !item.auth;
      });
    }
  },
  methods: {
    handleLogout(logout) {
      if (logout) {
        return this.$store.dispatch('LOGOUT');
      } else {
        return;
      }
    }
  }
};
</script>
