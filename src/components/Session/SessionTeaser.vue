<template>
  <v-card outlined class="mb-10 p-2">
    <router-link
      :to="{
        name: 'sessionDetail',
        path: `session/${session.id}`,
        params: { session: session }
      }"
    >
      <h3>{{ session.title }}</h3>
    </router-link>

    <v-btn>Session Detail</v-btn>

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

    <v-simple-table v-for="set in session.sessionGroup" v-bind:key="set.title"
      ><template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">{{ set.exercise.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in set.session" v-bind:key="item.title">
            <td>{{ index + 1 }}</td>
            <td>{{ item.resistance }}kg x {{ item.reps }}</td>
          </tr>
        </tbody>

        <tbody></tbody> </template
    ></v-simple-table>
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
