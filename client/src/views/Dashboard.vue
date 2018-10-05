<template>
  <v-container>
    <Navigation :username="user.username" />
    <h1>Here is Dashboard</h1>
    <AddNewNote />>
  </v-container>
</template>

<script>
const API_URL = "http://localhost:5000/";

import Navigation from "@/components/DashboardNav";
import AddNewNote from "@/components/AddNewNote";

export default {
  components: {
    Navigation,
    AddNewNote
  },
  data: () => ({
    user: null
  }),
  mounted() {
    console.log(this.access),
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
