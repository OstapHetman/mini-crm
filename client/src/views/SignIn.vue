<template>
  <v-content class="mt-5" >
    <img v-if="signingIn" class="loader" src="../assets/loader.svg" alt="loader">
    <v-container v-if="!signingIn" fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md5>
          <v-alert v-if="errorMessage"
            :value="true"
            type="error"
          >
            {{ errorMessage }}
          </v-alert>
          <v-card class="elevation-12">
            <v-toolbar dark color="deep-purple">
              <v-toolbar-title>Sign In</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSignIn()">
                <v-text-field
                prepend-icon="person"
                name="username"
                label="Username"
                type="text"
                :counter="30"
                required
                v-model="user.username"
                ></v-text-field>
                <v-text-field id="password"
                prepend-icon="lock_open"
                name="password"
                label="Password"
                type="password"
                v-model="user.password"
                ></v-text-field>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="white--text deep-purple " type="submit">Sign In</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Joi from "joi";

const SIGNIN_URL = "http://localhost:5000/auth/signin";

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string()
    .trim()
    .min(8)
    .required()
});
export default {
  data: () => ({
    user: {
      username: "",
      password: ""
    },
    errorMessage: "",
    signingIn: false
  }),
  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  methods: {
    onSignIn() {
      if (this.validUser()) {
        this.errorMessage = "";
        this.signingIn = true;
        const body = {
          username: this.user.username,
          password: this.user.password
        };

        fetch(SIGNIN_URL, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then(error => {
                throw new Error(error.message);
              });
            }
          })
          .then(result => {
            console.log(result);
            setTimeout(() => {
              this.signingIn = false;
              // this.$router.push("/dashboard");
            }, 1000);
          })
          .catch(error => {
            setTimeout(() => {
              this.signingIn = false;
              this.errorMessage = error.message;
            }, 1000);
          });
      }
    },
    validUser() {
      const result = Joi.validate(this.user, schema);
      if (result.error === null) {
        return true;
      }
      if (result.error.message.includes("username")) {
        this.errorMessage = "Username is invalid";
      } else if (result.error.message.includes("password")) {
        this.errorMessage = "Password is invalid";
      } else {
        console.log(result.error);
        return false;
      }
    }
  }
};
</script>

<style>
</style>
