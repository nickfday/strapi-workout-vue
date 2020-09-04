<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
        <v-row class="fill-height" align="center" justify="center">
          <!-- <div class="display-3">
            {{ item.heading }}
          </div> -->
          <ctaBox
            :heading="item.heading"
            :body="item.body"
            ctaText=""
            ctaUrl=""
            fullWidth="true"
            padding="30px"
          />
        </v-row>
      </v-carousel-item>
    </v-carousel>

    <v-row>
      <v-col
        v-for="card in pageData.components[1].cardGroup"
        v-bind:key="card.title"
        :md="6"
      >
        <v-card class="mx-auto" :to="card.linkSlug">
          <v-img
            class="white--text align-end"
            height="200px"
            :src="card.media.url"
          >
            <v-card-title>{{ card.title }}</v-card-title>
          </v-img>

          <v-card-text class="text--primary">
            <div>{{ card.body }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-parallax
      dark
      src="https://strapi-workout.s3.eu-west-2.amazonaws.com/pexels-freestocksorg-892757_48d3968168.jpeg"
      height="400"
    >
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">App coming soon!</h1>
          <ctaBox
            heading="App coming soon!"
            body=""
            ctaText=""
            ctaUrl=""
            fullWidth="true"
          />
          <!-- <h4 class="subheading">Build your application today!</h4> -->
        </v-col>
      </v-row>
    </v-parallax>
  </div>
</template>

<script>
import fetchService from '@/services/fetchService';

import CtaBox from '@/components/ctaBox';

export default {
  components: {
    CtaBox
  },
  data() {
    return {
      items: [
        {
          src:
            'https://strapi-workout.s3.eu-west-2.amazonaws.com/sunset-jogger_2529c47069.jpeg',
          heading: 'Our Mission',
          body:
            'We believe in encouraging an active a life-style for people of all abilities. We aim to provide a trustworthy resource to help  achieve your fitness ongoing fitness objective.'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      pageData: []
    };
  },

  created() {
    fetchService
      .fetchData('pages/1')
      .then((response) => {
        console.log(response);
        this.pageData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
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
</style>
