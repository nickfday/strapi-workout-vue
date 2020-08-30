<template>
  <div>
    <h1>Edit Session</h1>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row align="center">
        <v-col>
          <v-text-field
            label="Session Name"
            v-model="session.title"
            :rules="[rules.required]"
          />
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
                label="Start Time"
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
        <v-col
          ><v-text-field
            label="Duration (mins)"
            v-model="session.duration"
            maxlength="3"
            :rules="[rules.required]"
        /></v-col>
      </v-row>

      <div v-for="set in session.sessionGroup" v-bind:key="set.title">
        <v-simple-table>
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
                    item-text="title"
                    item-value="id"
                    :rules="[(v) => !!v || 'Exercise is required']"
                    required
                  ></v-select>
                </th>
                <th>Resistance/Reps</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in set.session" v-bind:key="item.title">
                <td>{{ index + 1 }}</td>
                <td>
                  <v-text-field
                    v-model="item.resistance"
                    :rules="[rules.required]"
                  />x
                  <v-text-field v-model="item.reps" :rules="[rules.required]" />
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn v-on:click="addSet(set, index)">Add Set</v-btn>
        <v-btn v-on:click="removeSet(set, session.sessionGroup)"
          >Remove Set</v-btn
        >
      </div>
    </v-form>

    <br />
    <br />

    <v-btn v-on:click="addExercise">Add Exercise</v-btn>
    <br />
    <br />
    <v-btn @click="validate" :disabled="!valid">Save Session</v-btn>
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
      time: new Date().toISOString().substr(11, 5),
      timeMenu: false,
      menu: false,
      valid: true,
      rules: {
        required: (value) => !!value || 'Required.'
      },
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
    addSet(set, index) {
      set.session.push({
        id: index,
        reps: null,
        resistance: null
      });
      console.log(set);
    },
    removeSet(set, sessionGroup) {
      set.session.pop();
      console.log(set.session.length);
      if (set.session.length === 0) {
        sessionGroup.pop();
      }
    },
    validate() {
      // todo: prevent empty set
      if (this.$refs.form.validate()) {
        if (this.session.sessionGroup.length > 0) {
          this.saveSession();
        } else {
          alert('You need to at least one exercise');
        }
      } else {
        return;
      }
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
