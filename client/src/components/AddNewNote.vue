<template>
  <v-layout row justify-center>
    <v-flex xs12 sm8 md6>
      <v-card class="px-4 py-4">
        <v-card-title>
          <h3 class="headline mb-0">
            Add new note
          </h3>
        </v-card-title>
        <v-form @submit.prevent="addNote()">
          <v-text-field
            v-model="newNote.title"
            :counter="40"
            label="Enter a title"
            required
          ></v-text-field>
          <v-textarea
            v-model="newNote.body"
            label="Enter your note"
            required
          ></v-textarea>
          <v-card-actions>
            <v-btn type="submit" color="purple white--text">Add new note</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const NOTE_URL = "http://localhost:5000/api/v1/notes";

export default {
  data: () => ({
    newNote: {
      title: "",
      body: ""
    },
    notes: []
  }),
  methods: {
    addNote() {
      fetch(NOTE_URL, {
        method: "POST",
        body: JSON.stringify(this.newNote),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => {
          res.json();
        })
        .then(note => {
          this.notes.push(note);
          this.newNote = {
            title: "",
            body: ""
          };
        });
    }
  }
};
</script>

<style>
</style>
