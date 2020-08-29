<template>
  <div>
    <h1>Edit Session</h1>

    <v-row align="center">
      <v-col>
        <v-text-field label="Session Name" v-model="session.title" />
      </v-col>
      <v-col>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="true"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="session.date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="session.date" no-title scrollable>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col>
        <v-menu
          ref="menu"
          v-model="timeMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
          use-seconds
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="mdi-clock-time-eight-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-model="time"
            v-if="timeMenu"
            full-width
            @click:minute="setTotalTime($refs, time)"
          ></v-time-picker>
        </v-menu>
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
import axios from 'axios';
import { format } from 'date-fns';
import fetchService from '@/services/fetchService';

export default {
  data() {
    return {
      format,
      exercises: [],
      time: null,
      timeMenu: false,
      menu: false,
      session: {
        id: 1,
        title: '',
        //date: Date.now(),
        date: new Date().toISOString().substr(0, 10),
        exercise: null,
        user: this.$store.getters.getUserId,
        created_at: Date.now(),
        updated_at: Date.now(),
        duration: null,
        totalTime: null,
        totalTimeWithSeconds: null,
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
    async saveSession() {
      try {
        const data = await axios.post(
          `https://strapi-workout-backend.herokuapp.com/sessions?user.id=${this.$store.getters.getUserId}`,
          this.session,
          {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getJwtToken}`
            }
          }
        );
        console.log(data);
        this.$router.push('/athlete/activity-history');
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    setTotalTime(refs, time) {
      refs.menu.save(time);
      this.session.totalTime = time + ':00';
      this.timeMenu = false;
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
