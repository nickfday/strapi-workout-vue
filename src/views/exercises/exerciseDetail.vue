<template>
  <div>
    <h1>{{ exercise.title }}</h1>
    <b-row>
      <b-col sm="8">
        <b-embed
          type="iframe"
          aspect="16by9"
          :src="exercise.videoUrl"
          allowfullscreen
        ></b-embed>
      </b-col>
      <b-col sm="4">
        <div>
          <b-list-group>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <span class="mr-auto">{{ exercise.type }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
              <span class="mr-auto">{{ exercise.primaryMuscle.title }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <!-- <span v-for="(item, index) in exercise.secondaryMuscle">
                {{ item.title }}
                <span v-if="index != exercise.secondaryMuscle.length - 1"
                  >,</span
                >
              </span> -->
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar
                variant="success"
                icon="people-fill"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">{{ exercise.equipment[0].title }}</span>
            </b-list-group-item>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar
                variant="success"
                icon="people-fill"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">
                {{ exercise.variationExercise[0].title }}
              </span>
            </b-list-group-item>
          </b-list-group>
        </div>
      </b-col>
    </b-row>

    <vue-simple-markdown :source="exercise.body"></vue-simple-markdown>
  </div>
</template>

<script>
import fetchService from '@/services/fetchService';

export default {
  data() {
    return {
      exercise: {},
    };
  },
  created() {
    fetchService
      .fetchStrapiData(`exercises?slug=bench-press`)
      .then((response) => {
        console.log(response);
        this.exercise = response.data[0];
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
