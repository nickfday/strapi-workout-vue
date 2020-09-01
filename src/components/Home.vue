<template>
  <div>
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
  </div>
</template>

<script>
import fetchService from '@/services/fetchService';

export default {
  data() {
    return {
      pageData: []
    };
  },

  created() {
    fetchService
      .fetchStrapiData('pages/1')
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

<style></style>
