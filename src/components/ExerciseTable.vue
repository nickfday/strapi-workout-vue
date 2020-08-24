<template>
  <div>
    <h1 v-if="title">{{ title }}</h1>

    <div v-if="showForm" class="exercise-form">
      <v-row>
        <v-col>
          <v-text-field
            v-model="exerciseFilter"
            label="Exercise"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedType"
            :items="selectOptions('type')"
            clearable
            label="Type"
          ></v-select>
        </v-col>
        <v-col>
          <v-select
            v-model="selectedPrimaryMuscle"
            :items="selectOptions('primaryMuscle')"
            clearable
            label="Primary Muscle"
          ></v-select>
        </v-col>
      </v-row>
    </div>

    <v-data-table
      :headers="fields"
      :items="filteredList"
      :items-per-page="15"
      class="elevation-1"
    ></v-data-table>
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
          text: 'Exercises',
          value: 'title',
          sortable: true
        },
        { text: 'Type', value: 'type', sortable: true },
        {
          text: 'Primary Muscle',
          value: 'primaryMuscle',
          sortable: true
        }
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: 'Exercises'
    },
    showForm: {
      type: Boolean,
      default: true
    }
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
        ...new Set(this.formattedExercises.map((item) => item[field]))
      ];
      return unique;
    },
    clearFilters() {
      console.log('clicked');
      this.exerciseFilter = '';
      this.selectedPrimaryMuscle = null;
      this.selectedType = null;
    }
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
          slug: exercise.slug
        };
      });
    }
  }
};
</script>

<style></style>
