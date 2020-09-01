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
      :loading="this.$store.getters.loading"
      loading-text="Fetching Exercises"
      no-results-text="No Exercises Found. Please adjust filters"
      sort-by="title"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exerciseFilter: '',
      selectedPrimaryMuscle: '',
      selectedType: '',
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
    this.$store.dispatch('FETCH_EXERCISES');
    //TODO: Check local storage before fetching
    //this.$store.dispatch('CHECK_LOCAL_STORAGE_EXERCISES');
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
      return this.$store.getters.exercises.map((exercise) => {
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
