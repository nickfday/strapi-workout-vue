<template>
  <div>
    <h1>Home</h1>
    <b-row>
      <b-col
        v-for="card in pageData.components[1].cardGroup"
        v-bind:key="card.title"
        sm="6"
      >
        <b-card
          :title="`${card.title}`"
          :img-src="`${card.media.url}`"
          img-alt="Image"
          img-top
          tag="article"
          class="mb-2"
        >
          <b-card-text>{{ card.body }}</b-card-text>
          <!-- <router-link :to="{ path: 'exercise/' + card.slug }">
            <b-button variant="primary">
              {{ card.link.title }}
            </b-button>
          </router-link> -->
        </b-card>
      </b-col>
    </b-row>
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
