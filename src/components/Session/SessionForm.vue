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
      session: {
        id: 1,
        title: '',
        date: Date.now(),
        exercise: null,
        user: this.$store.getters.getUserData,

        created_at: '2020-08-10T22:39:12.803Z',
        updated_at: '2020-08-27T15:01:53.772Z',
        duration: null,
        time: 45,
        sessionGroup: [
          {
            id: 1,
            exercise: {
              id: 62,
              title: 'Bench Press',
              body:
                "### Safety First\n\nThe bench press is a potentially dangerous exercise if you don't take precautions. Ideally perform this exercise with a spotter present behind the bar. If that's not possible then safety bars should be used so the bar cannot hit your torso. If you don't take this advice and find yourself unable to lift the bar then roll the back forward towards your legs until you can free yourself.  Ensure you wrap your thumbs around the bar, a thumbless grips increases the risk of dropping the bar (it's nicknamed the suicide grip for a reason). \n\n### Instructions\n\n![strong-sportsman-working-out-on-bench-in-modern-gym-3837757](https://strapi-workout.s3.eu-west-2.amazonaws.com/strong-sportsman-working-out-on-bench-in-modern-gym-3837757_2ab7da709b.jpeg)\n\nLie back on a flat bench. Using a medium width grip (a grip that creates a 90-degree angle in the middle of the movement between the forearms and the upper arms), lift the bar from the rack and hold it straight over you with your arms locked. This will be your starting position.\n\n1. From the starting position, breathe in and begin coming down slowly until the bar touches your middle chest.\n2. After a brief pause, push the bar back to the starting position as you breathe out. Focus on pushing the bar using your chest muscles. Lock your arms and squeeze your chest in the contracted position at the top of the motion, hold for a second and then start coming down slowly again. Tip: Ideally, lowering the weight should take about twice as long as raising it.\n3. Repeat the movement for the prescribed amount of repetitions.\n4. When you are done, place the bar back in the rack.\n\nThe movement may be performed while arching the back power-lifter style. This position brings the more powerful lower part of the pectoral muscle into play, allowing heavier weights to be lifted. \n\n### Tips\n\nYour technique will improve with practise. Once your strength increases fade and you start to plateau, technique becomes more important than ever. \n\nRemember to focus on your breathing. Deeply inhaling while lowering the weight and forciibly exhaling on the contraction.\n\nLeg drive is a key component in optimising your lifit. Before lifting, ensure your feet and are placed firmly on the floor alongside the front of the bench. When you grab the bar and initially lift, you  should distribute the tension across your quads, abdomin (tense your abs), your lats, chest and shoulders. Ultimately you should aim to create a block (see article on [blocking](/article/blocking)) so that you are using your entire body to lift the weight. This will help you lift more weight and protect you from strains and injuries (rotator cuff injuries are common in the bench press).",
              slug: 'bench-press',
              videoUrl: 'https://www.youtube.com/embed/RsobeWfbBcY',
              primaryMuscle: 1,
              equipment: 'Bar',
              type: 'Weight_Training',
              created_at: '2020-06-02T16:33:53.165Z',
              updated_at: '2020-06-12T17:02:26.820Z',
              image: null,
              videoMedia: null
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
