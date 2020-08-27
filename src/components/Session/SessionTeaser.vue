<template>
  <v-card outlined class="mb-10 p-2">
    <v-row align="center">
      <v-col>
        <h3>{{ session.title }}</h3>
      </v-col>
      <v-col>
        <v-icon>mdi-calendar-range</v-icon>
        {{ format(new Date(session.date), 'MM/dd/yyyy') }}</v-col
      >
      <v-col>
        <v-icon>mdi-clock-time-eight-outline</v-icon>
        {{ session.time }} mins
      </v-col>

      <v-col>
        <v-btn v-on:click="handleShowDetail">
          <span v-if="!showDetail">Detail View</span>
          <span v-else>Simple View</span>
        </v-btn>
      </v-col>
    </v-row>

    <v-simple-table v-if="!showDetail" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" width="40%">Exercise</th>
            <th class="text-left">Best Set</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="set in session.sessionGroup" v-bind:key="set.title">
            <td>{{ set.session.length }} x {{ set.exercise.title }}</td>
            <td>{{ bestSet(set.session) }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-simple-table
      v-else
      v-for="set in session.sessionGroup"
      v-bind:key="set.title"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" width="40%">{{ set.exercise.title }}</th>
            <th>Resistance/Reps</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in set.session" v-bind:key="item.title">
            <td>{{ index + 1 }}</td>
            <td>{{ item.resistance }}kg x {{ item.reps }}</td>
          </tr>
        </tbody>
        <tbody></tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      showDetail: false,
      format
    };
  },
  props: {
    session: {
      type: Object
    }
  },
  methods: {
    bestSet: (sets) => {
      const biggestSet = sets.reduce((prev, current) => {
        console.log(current);
        if (+current.resistance > +prev.resistance) {
          return current;
        } else {
          return prev;
        }
      });
      return `${biggestSet.reps} x ${biggestSet.resistance}kg`;
    },
    handleShowDetail() {
      this.showDetail = !this.showDetail;
    }
  }
};
</script>

<style></style>
