<template>
  <div>
    <div v-for="session in sessions" v-bind:key="session.title">
      <h2>{{ session.title }}</h2>
      <div
        v-for="group in session.sessionGroup"
        v-bind:key="group.exercise.title"
      >
        <h5>{{ group.exercise.title }}</h5>
        <p v-for="set in group.session" v-bind:key="set.reps">
          Reps: {{ set.reps }}
          <br />
          Resistance: {{ set.resistance }}
        </p>
      </div>
    </div>
    <!-- <b-table striped hover :items="sessions"></b-table> -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
