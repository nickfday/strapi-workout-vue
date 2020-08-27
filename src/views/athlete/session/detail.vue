<template>
  <div>
    {{ this.$route.params }}
    <h1>Session Detail</h1>
    <h1>{{ session.title }}</h1>

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
            <td>{{ set.exercise.title }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      session: null
    };
  },
  props: ['name'],
  created() {
    this.session = this.$route.params.session;
    // else fetch
  }
};
</script>

<style></style>
