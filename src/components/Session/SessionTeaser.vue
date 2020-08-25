<template>
  <v-card outlined class="mb-10 p-2">
    <h3>{{ session.title }}</h3>

    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Exercise</th>
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
  </v-card>

  <!-- <div
      v-for="group in session.sessionGroup"
      v-bind:key="group.exercise.title"
    >
      <p v-for="set in group.session" v-bind:key="set.reps">
        Reps: {{ set.reps }}
        <br />

        Resistance: {{ set.resistance }}kg
      </p>
    </div> -->
</template>

<script>
export default {
  data: () => {},
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
    }
  }
};
</script>

<style></style>
