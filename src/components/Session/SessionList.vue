<template>
  <div>
    <v-btn href="session/form">New Session</v-btn>
    <SessionTeaser
      v-bind:session="session"
      v-for="session in sessions"
      v-bind:key="session.id"
    />
  </div>
</template>

<script>
import axios from 'axios';
import SessionTeaser from '@/components/Session/SessionTeaser';

export default {
  components: {
    SessionTeaser
  },
  data() {
    return {
      sessions: []
    };
  },

  created() {
    axios
      .get(
        `https://strapi-workout-backend.herokuapp.com/sessions?user.id=${this.$store.getters.getUserId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getJwtToken}`
          }
        }
      )
      .then((response) => {
        this.sessions = response.data;
      });
  }
};
</script>

<style></style>
