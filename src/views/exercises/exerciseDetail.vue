<template>
  <div>
    <h1>{{ exercise.title }}</h1>
    <v-row>
      <v-col sm="8">
        <iframe
          width="560"
          height="315"
          :src="exercise.videoUrl"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </v-col>
      <v-col sm="4">
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Type</v-list-item-title>
                <v-list-item-subtitle>
                  {{ exercise.type.replace(/_/g, ' ') }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Primary Muscle</v-list-item-title>
                <v-list-item-subtitle>
                  {{ exercise.primaryMuscle.title }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item v-if="exercise.secondaryMuscle.length">
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Secondary Muscles</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    v-for="(item, index) in exercise.secondaryMuscle"
                    v-bind:key="item.id"
                  >
                    {{ item.title
                    }}<span v-if="index != exercise.secondaryMuscle.length - 1"
                      >,</span
                    ></span
                  >
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Equipment</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    v-for="(item, index) in exercise.equipment"
                    v-bind:key="item.id"
                  >
                    {{ item.title
                    }}<span v-if="index != exercise.equipment.length - 1"
                      >,</span
                    >
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Variation Exercise</v-list-item-title>
                <v-list-item-subtitle>
                  <span
                    v-for="(item, index) in exercise.variationExercise"
                    v-bind:key="item.id"
                  >
                    {{ item.title }}
                    <span v-if="index != exercise.variationExercise.length - 1">
                      ,
                    </span>
                  </span>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- <div>
          <b-list-group>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar class="mr-3"></b-avatar>
              <span class="mr-auto">{{ exercise.type }}</span>
            </b-list-group-item>

            <b-list-group-item class="d-flex align-items-center">
              <b-avatar variant="primary" text="BV" class="mr-3"></b-avatar>
              <span class="mr-auto">{{ exercise.primaryMuscle.title }}</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex align-items-center"
              v-if="exercise.secondaryMuscle.length"
            >
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span v-for="(item, index) in exercise.secondaryMuscle">
                {{ item.title }}
                <span v-if="index != exercise.secondaryMuscle.length - 1"
                  >,</span
                >
              </span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex align-items-center"
              v-if="this.exercise.equipment.length"
            >
              <b-avatar
                variant="success"
                icon="people-fill"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">{{
                this.exercise.equipment[0].title
              }}</span>
            </b-list-group-item>

            <b-list-group-item
              class="d-flex align-items-center"
              v-if="exercise.variationExercise.length"
            >
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
        </div> -->
      </v-col>
    </v-row>

    <vue-simple-markdown :source="exercise.body"></vue-simple-markdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  created() {
    this.$store.dispatch('FETCH_EXERCISE_DETAIL');
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'exercise'
      // ...
    ])
  }
};
</script>

<style></style>
