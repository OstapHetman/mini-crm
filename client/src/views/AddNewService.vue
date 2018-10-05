<template>
  <v-layout row justify-center>
    <v-flex xs12 sm8 md6>
      <v-alert
        :value="true"
        :type="typeOfAlert"
        class="mb-3"
        transition="scale-transition"
        v-if="successMsg"
        >
        {{ message }}
      </v-alert>
      <v-card class="px-4 py-4">
        <v-card-title>
          <h3 class="headline mb-0">
            Add new service
          </h3>
        </v-card-title>
        <v-form @submit.prevent="addNote()">
          <v-text-field
            v-model="newNote.title"
            label="Enter a name of service"
            required
          ></v-text-field>
          <v-text-field
            v-model="newNote.price"
            label="Enter a price of service"
            required
          ></v-text-field>

          <v-layout row wrap v-for="(feature, index) in newNote.featuresOfService" :key="index">
            <v-flex xs9 sm8 md10>
              <v-text-field
              v-model="feature.feature"
              label="Enter feature of service"
              required
              ></v-text-field>
            </v-flex>
            <v-flex xs3 sm4 md2 class="pl-2">
              <v-text-field
              v-model="feature.price"
              label="Price"
              required
              ></v-text-field>
            </v-flex>
          </v-layout>
          
          <v-layout row>
            <v-flex xs12>
              <v-btn 
              color="purple"
              dark
              @click="addFeaturesOfService()"
              >
              Add features of service
              </v-btn>
              <v-btn 
              color="error"
              dark
              @click="removeFeaturesOfService()"
              v-if="newNote.featuresOfService.length >= 2"
              >
              Remove feature
              </v-btn>
            </v-flex>
          </v-layout>
          <v-textarea
            v-model="newNote.body"
            label="Enter service description"
            required
          ></v-textarea>
          <v-card-actions>
            <v-btn type="submit" color="success white--text">Add new service</v-btn>
            <v-btn type="submit" color="error white--text">Clear</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
const NOTE_URL = "http://localhost:5000/api/v1/notes";
import Joi from "joi";

const schema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .max(40)
    .required(),
  price: Joi.string()
    .trim()
    .required(),
  featuresOfService: Joi.array(),
  body: Joi.string()
    .trim()
    .required()
});

export default {
  data: () => ({
    newNote: {
      title: "",
      price: "",
      body: "",
      featuresOfService: [
        {
          feature: "",
          price: ""
        }
      ]
    },
    successMsg: false,
    message: "",
    typeOfAlert: "",
    notes: []
  }),
  methods: {
    addFeaturesOfService() {
      this.newNote.featuresOfService.push({
        feature: this.feature
      });
    },
    removeFeaturesOfService() {
      this.newNote.featuresOfService.pop();
    },
    validForm() {
      const result = Joi.validate(this.newNote, schema);
      if (result.error === null) {
        return true;
      } else {
        return false;
      }
    },
    addNote() {
      if (this.validForm()) {
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
            this.typeOfAlert = "success";
            this.message = "New service successfully added.";
            this.successMsg = true;
            setTimeout(() => {
              this.successMsg = false;
            }, 4000);
            this.newNote = {
              title: "",
              price: "",
              body: "",
              featuresOfService: [
                {
                  feature: "",
                  price: ""
                }
              ]
            };
          });
      } else {
        this.typeOfAlert = "error";
        this.message = "Please fill all fields";
        this.successMsg = true;
        setTimeout(() => {
          this.successMsg = false;
        }, 4000);
      }
    }
  }
};
</script>

<style>
</style>
