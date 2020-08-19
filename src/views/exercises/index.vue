<template>
  <div>
    <h1>Exercises</h1>

    <b-container>
      <b-row>
        <b-col>
          <b-form-input v-model="exerciseFilter" placeholder="Exercise" />
        </b-col>
        <b-col>
          <b-form-select
            v-model="selectedType"
            :options="selectOptions('type')"
          >
            <template v-slot:first>
              <b-form-select-option :value="null"
                >--Type--</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
        <b-col>
          <b-form-select
            v-model="selectedPrimaryMuscle"
            :options="selectOptions('primaryMuscle')"
          >
            <template v-slot:first>
              <b-form-select-option :value="null"
                >--Primary Muscle--</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
      </b-row>
    </b-container>

    <b-table
      v-if="filteredList.length"
      :fields="fields"
      :items="filteredList"
      responsive="sm"
      fixed
    >
      <template v-slot:cell(title)="data">
        <router-link :to="{ path: 'exercises/' + data.item.slug }">{{
          data.item.title
        }}</router-link>
      </template>

      <!-- Optional default data cell scoped slot -->
      <template v-slot:cell()="data">{{ data.value }}</template>
    </b-table>

    <div v-else>
      <p>
        No Exerises found
        <button v-on:click="clearFilters()">Clear Filters</button>
      </p>
    </div>
  </div>
</template>

<script>
import fetchService from '@/services/fetchService';

export default {
  data() {
    return {
      exerciseFilter: '',
      selectedPrimaryMuscle: '',
      selectedType: '',
      exercises: [],
      fields: [
        {
          key: 'title',
          label: 'Exercises',
          sortable: true,
        },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'primaryMuscle', label: 'Primary Muscle', sortable: true },
      ],
    };
  },
  created() {
    fetchService
      .fetchStrapiData('exercises')
      .then((response) => {
        console.log(response);
        this.exercises = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    selectOptions(field) {
      const unique = [
        ...new Set(this.formattedExercises.map((item) => item[field])),
      ];
      return unique;
    },
    clearFilters() {
      console.log('clicked');
      this.exerciseFilter = '';
      this.selectedPrimaryMuscle = null;
      this.selectedType = null;
    },
  },

  computed: {
    filteredList() {
      return this.formattedExercises.filter((exercise) => {
        if (
          this.selectedPrimaryMuscle &&
          this.selectedPrimaryMuscle != exercise.primaryMuscle
        ) {
          return;
        }
        if (this.selectedType && this.selectedType != exercise.type) {
          return;
        }
        return exercise.title
          .toLowerCase()
          .includes(this.exerciseFilter.toLowerCase());
      });
    },
    formattedExercises() {
      return this.exercises.map((exercise) => {
        return {
          title: exercise.title,
          type: exercise.type.replace(/_/g, ' '),
          primaryMuscle: exercise.primaryMuscle
            ? exercise.primaryMuscle.title
            : '',
          slug: exercise.slug,
        };
      });
    },
  },
};
</script>

<style></style>
