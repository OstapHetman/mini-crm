<template>
  <v-layout row>
    <v-flex xs12 sm8 md6>
      <h1>Welcome, {{ user.username }}!</h1>
      <v-btn color="white--text primary" @click="logout()">Logout</v-btn>
    </v-flex>
  </v-layout>
  
</template>

<script>
const API_URL = "http://localhost:5000/";
export default {
  data: () => ({
    user: null
  }),
  mounted() {
    fetch(API_URL, {
      headers: {
        authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.user) {
          this.user = result.user;
        } else {
          this.logout();
        }
      });
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/signin");
    }
  }
};
</script>

<style>
</style>
