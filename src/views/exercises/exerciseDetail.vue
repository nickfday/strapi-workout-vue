<template>
  <div>
    <h1>{{ exercise.title }}</h1>
    <v-row>
      <v-col sm="8">
        <iframe
          width="100%"
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
                <v-icon>mdi-run-fast</v-icon>
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
                <v-icon>mdi-arm-flex</v-icon>
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
                <v-icon>mdi-arm-flex-outline</v-icon>
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
                <v-icon>mdi-cable-data</v-icon>
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
                <v-icon>mdi-link-box</v-icon>
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
      </v-col>
    </v-row>

    <div v-html="compiledMarkdown(exercise.body)" class="markdown"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import marked from 'marked';

export default {
  data() {
    return {
      input: '## hello'
    };
  },
  created() {
    this.$store.dispatch('FETCH_EXERCISE_DETAIL');
  },
  filters: {
    marked: marked
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(['exercise'])
  },
  methods: {
    compiledMarkdown: function(input) {
      return marked(input, { sanitize: true });
    }
  }
};
</script>

<style></style>
