<template>
  <div>
    <h1>Routines</h1>

    <v-row>
      <v-col v-for="routine in routines" v-bind:key="routine.id" :md="6">
        <v-card class="mx-auto">
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{
                routine.title
              }}</v-list-item-title>
              <!-- <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>

          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="194"
          ></v-img>

          <v-card-text>
            Visit ten places on our planet that are undergoing the biggest
            changes today.
          </v-card-text>

          <!-- <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              Read
            </v-btn>
            <v-btn text color="deep-purple accent-4">
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions> -->
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
      routines: []
    };
  },
  created() {
    fetchService
      .fetchData('routines')
      .then((response) => {
        console.log(response);
        // this.loading = false;
        this.routines = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
</script>

<style></style>
