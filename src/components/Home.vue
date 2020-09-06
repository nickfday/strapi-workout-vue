<template>
  <div>
    <!-- Carousel -->

    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in carouselItems"
        :key="i"
        :src="item.src"
      >
        <!-- <div class="display-3">
            {{ item.heading }}
          </div> -->
        <CtaBox
          :heading="item.heading"
          :body="item.body"
          ctaText=""
          ctaUrl=""
          fullWidth="true"
          padding="30px"
          wrapperClasses="flex-end align-end"
        />
      </v-carousel-item>
    </v-carousel>

    <!-- Register CTA -->

    <h2 class="text-center mt-5">Log your workout</h2>

    <v-row>
      <v-col md="8">
        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar size="62">
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-col>

      <!-- Anonymous CTA -->

      <v-col
        align-self="center"
        justify="center"
        class="text-center"
        v-if="!loggedIn"
      >
        <v-btn x-large color="primary" to="/auth/register">Register</v-btn>
        <br />
        <br />
        <br />
        <br />
        <!-- <v-divider></v-divider> -->
        <v-btn x-large color="secondary" to="/auth/login">Login</v-btn>
      </v-col>

      <!-- LoggedIn CTA -->

      <v-col v-else>
        <v-btn x-large color="primary" href="/athlete/dashboard">
          Dashboard
        </v-btn>
      </v-col>
    </v-row>

    <!-- Cards -->

    <h2 class="text-center mt-5">Get Informed</h2>

    <v-row>
      <v-col v-for="card in cards" v-bind:key="card.id" :md="6">
        <v-card class="mx-auto" :to="card.slug">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="card.imageSrc"
          >
            <CtaBox :body="card.title" fullWidth="true" padding="0 30px" />
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ card.body }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- App Parallax -->

    <v-parallax
      dark
      src="https://strapi-workout.s3.eu-west-2.amazonaws.com/pexels-freestocksorg-892757_48d3968168.jpeg"
      height="400"
      class="mt-10"
    >
      <!-- <h1 class="display-1 font-weight-thin mb-4">App coming soon!</h1> -->
      <CtaBox
        heading="App coming soon"
        body="In the meantime use our website and your progress will be up to date when our app is launched"
        fullWidth="true"
        padding="10px"
        wrapperClasses="text-center align-center justify-center"
      />
    </v-parallax>
  </div>
</template>

<script>
import { authComputed } from '@/store/helpers';
import CtaBox from '@/components/ctaBox';

export default {
  components: {
    CtaBox
  },
  data() {
    return {
      carouselItems: [
        {
          src:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/sunset-jogger_2529c47069.jpeg',
          heading: 'Our Mission',
          body:
            'We believe in encouraging an active a life-style for people of all abilities. We aim to provide a trustworthy resource to help achieve your ongoing fitness objective.'
        },
        {
          heading: 'Boost Your Mental Health',
          body:
            'Regular exercise has numerous positive effects such as improving mental health, regulating moods and boosting professional performance.',

          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          heading: 'Improve Your Phsyical Health',
          body:
            'Maintaining a healthy weight requires physical activity to burn energy. Obese people have an increased risk of heart disease, strokes, diabetes and some types of cancer. Adults should do a minimum of 150 minutes moderate-intensity activity a week.',
          src:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/pexels-pixabay-53404_1436ba58e9.jpeg'
        }
      ],
      items: [
        { header: 'Register an account to unlock features such as:' },
        {
          avatar:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/thumbnail_man-working-out-2294361_5142028728.jpeg',
          title: 'Schedule workouts to meet your fitness guides',
          subtitle:
            "<span class='text--primary'>Get prepared by selecting from a sample routine or create your own sessions"
        },
        { divider: true, inset: true },
        {
          avatar:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/thumbnail_adult-athlete-body-bodybuilding-414029_9353d04811.jpeg',
          title: 'Record your workouts and track your progress',
          subtitle:
            "<span class='text--primary'>Will help you achieve incremental gains and new PRs"
        },
        { divider: true, inset: true }
      ],
      pageData: [],
      cards: [
        {
          id: 1,
          title: 'Exercises',
          body:
            'Browse our exercise database with instructions, information and videos',
          imageSrc:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/small_athlete-barbell-body-841128_a6af10f1d2.jpeg?196303292.52500004',
          slug: '/exercises'
        },
        {
          id: 2,
          title: 'Routines',
          body:
            'Browse our list of workout routines and find the right one for your goals',
          imageSrc:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/small_calendar-cup-depth-of-field-210660_329d203bb8.jpeg',
          slug: '/routines'
        }
      ]
    };
  },

  computed: {
    ...authComputed
  }
};
</script>

<style>
.textbox {
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 15px 30px;
  position: absolute;
  bottom: 0;
  font-size: 18px;
}
.v-parallax .v-parallax__content {
  padding: 0;
}
</style>
