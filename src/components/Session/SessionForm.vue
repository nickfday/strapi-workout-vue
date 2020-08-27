<template>
  <div>
    <h1>Edit Session</h1>

    <v-row align="center">
      <v-col>
        <v-text-field label="Session Name" v-model="session.title" />
        <!-- <h3>{{ session.title }}</h3> -->
      </v-col>
      <v-col>
        <v-icon>mdi-calendar-range</v-icon>
        {{ format(new Date(session.date), 'MM/dd/yyyy') }}
        <!-- <v-date-picker></v-date-picker> -->
      </v-col>
      <v-col>
        <v-icon>mdi-clock-time-eight-outline</v-icon>
        {{ session.time }} mins
      </v-col>
    </v-row>

    <v-simple-table v-for="set in session.sessionGroup" v-bind:key="set.title">
      <template v-slot:default>
        <thead>
          <tr>
            <!-- <th class="text-left" width="40%">{{ set.exercise.title }}</th> -->
            <th class="text-left" width="40%">
              <v-select
                :items="exercises"
                v-model="set.exercise"
                label="Exercises"
                clearable
                autocomplete
                item-text="title"
                item-value="id"
              ></v-select>
            </th>
            <th>Resistance/Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in set.session" v-bind:key="item.title">
            <td>{{ index + 1 }}</td>
            <td>
              <v-text-field v-model="item.resistance" />x
              <v-text-field v-model="item.reps" />
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn v-on:click="addExercise">Add Exercise</v-btn>
    <br />
    <br />
    <v-btn v-on:click="saveSession">Save Session</v-btn>
  </div>
</template>

<script>
// TODO:
// Time Input
// Date Input
//
import axios from 'axios';
import { format } from 'date-fns';
import fetchService from '@/services/fetchService';

export default {
  data() {
    return {
      format,
      exercises: [],
      session: {
        id: 1,
        title: '',
        date: Date.now(),
        exercise: null,
        user: this.$store.getters.getUserId,
        created_at: Date.now(),
        updated_at: Date.now(),
        duration: null,
        time: 45,
        sessionGroup: [
          {
            id: 1,
            exercise: {
              id: null,
              title: ''
            },
            session: [
              {
                id: 1,
                reps: null,
                resistance: null
              },
              {
                id: 2,
                reps: null,
                resistance: null
              },
              {
                id: 3,
                reps: null,
                resistance: null
              }
            ]
          }
        ]
      }
    };
  },
  created() {
    fetchService
      .fetchStrapiData('exercises')
      .then((response) => {
        console.log(response);
        this.loading = false;
        this.exercises = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addExercise() {
      this.session.sessionGroup.push({
        id: 6,
        session: [{ id: 1, reps: null, resistance: null }]
      });
    },
    saveSession() {
      axios
        .post(
          `https://strapi-workout-backend.herokuapp.com/sessions?user.id=${this.$store.getters.getUserId}`,
          this.session,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getJwtToken}`
            }
          }
        )
        .then((response) => {
          console.log(response);
        });
    }
  }
};
</script>

<style>
tbody .v-text-field {
  width: 20px;
  display: inline-block;
}
</style>
