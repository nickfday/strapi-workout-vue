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

  async created() {
    try {
      const response = await axios.get(
        `https://strapi-workout-backend.herokuapp.com/sessions?_sort=date:DESC&user.id=${this.$store.getters.getUserId}`,
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getJwtToken}`
          }
        }
      );
      this.sessions = response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style></style>
