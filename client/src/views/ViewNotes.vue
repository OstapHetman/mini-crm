<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 sm8 md6>
        <v-card >
          <v-toolbar color="purple" dark>
            <v-toolbar-title>Notes</v-toolbar-title>
          </v-toolbar>
          <v-list v-for="note in notes" :key="note._id" class="px-4">
            <v-list-tile-content>
              <v-list-tile-title>{{ note.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ note.body }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const NOTE_URL = "http://localhost:5000/api/v1/notes";
export default {
  data: () => ({
    notes: []
  }),
  mounted() {
    fetch(NOTE_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(notes => {
        this.notes = notes;
      });
  }
};
</script>

<style>
</style>
