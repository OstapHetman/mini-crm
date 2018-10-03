<template>
  <v-content class="mt-5" >
    <img v-if="signingUp" class="loader" src="../assets/loader.svg" alt="loader">
    <v-container fluid fill-height v-if="!signingUp">
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
              <v-toolbar-title>Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="onSignup">
                <v-text-field
                prepend-icon="person"
                name="username"
                label="Username"
                type="text"
                v-model="user.username"
                :rules="checkUsername"
                :counter="30"
                required
                ></v-text-field>
                <v-text-field
                prepend-icon="assignment_ind"
                name="fullName"
                label="Full Name"
                type="text"
                v-model="user.fullName"
                :rules="checkFullName"
                required
                ></v-text-field>
                <v-text-field id="password"
                prepend-icon="lock_open"
                name="password"
                label="Password"
                type="password"
                v-model="user.password"
                :rules="checkPassword"
                required
                ></v-text-field>
                <v-text-field id="confirmPassword"
                prepend-icon="lock"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                v-model="user.confirmPassword"
                :rules="[comparePasswords]"
                required
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="white--text deep-purple " type="submit">Sign Up</v-btn>
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

const SIGNUP_URL = "http://localhost:5000/auth/signup";

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  fullName: Joi.string().required(),
  password: Joi.string()
    .trim()
    .min(8)
    .required(),
  confirmPassword: Joi.string()
    .trim()
    .min(8)
    .required()
});

export default {
  data: () => ({
    errorMessage: "",
    signingUp: false,
    user: {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: ""
    },
    checkUsername: [
      v => !!v || "Username is required",
      v => (v && v.length >= 2) || "Username must be more than 2 characters"
    ],
    checkFullName: [v => !!v || "Full Name is required"],
    checkPassword: [
      v => !!v || "Password is required",
      v =>
        (v && v.length >= 8) ||
        "Password length must be at least 8 characters long"
    ]
  }),
  computed: {
    comparePasswords() {
      return this.user.password !== this.user.confirmPassword
        ? "Password do not match"
        : "";
    }
  },
  watch: {
    user: {
      handler() {
        this.errorMessage = "";
      },
      deep: true
    }
  },
  methods: {
    onSignup() {
      if (this.validUser()) {
        this.errorMessage = "";
        // send data to server...
        const body = {
          username: this.user.username,
          fullName: this.user.fullName,
          password: this.user.password
        };

        this.signingUp = true;

        fetch(SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json"
          }
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
          .then(user => {
            setTimeout(() => {
              this.signingUp = false;
              this.$router.push("/signin");
            }, 1000);
          })
          .catch(error => {
            setTimeout(() => {
              this.signingUp = false;
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
      } else if (result.error.message.includes("fullName")) {
        this.errorMessage = "Full Name is invalid";
      } else if (result.error.message.includes("confirmPassword")) {
        this.errorMessage = "Confrim password is not allowed to be empty";
      } else {
        console.log(result.error);
        return false;
      }
    }
  }
};
</script>

<style>
img.loader {
  position: absolute;
  right: 0;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 999;
  margin-top: 25vh;
}
</style>
