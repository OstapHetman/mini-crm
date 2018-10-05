<template>
  <v-container>
    <!-- Start Nav Drawer -->
    <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    app
    >
    <v-list dense>
      <v-list-tile avatar to="profile" class="py-4">
        <v-list-tile-avatar>
          <img src="https://randomuser.me/api/portraits/men/85.jpg">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ username }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mb-2"></v-divider>
      <!-- Start Menu Item -->
      <v-list-tile to="dashboard">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <!-- End Menu Item -->

      <!-- Start Menu Item -->
      <v-list-tile to="services">
        <v-list-tile-action>
          <v-icon>notes</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>View Services</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <!-- End Menu Item -->
        
      <!-- Start Menu Item -->
      <v-list-tile to="add-service">
        <v-list-tile-action>
          <v-icon>note_add</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Add Service</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <!-- End Menu Item -->

       <!-- Start Menu Item -->
      <v-list-tile to="settings">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <!-- End Menu Item -->

        <!-- Start Menu Item -->
      <v-list-tile to="faq">
        <v-list-tile-action>
          <v-icon>help</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>FAQ</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <!-- End Menu Item -->

    </v-list>
  </v-navigation-drawer>
    <!-- Start Toolbar -->
    <v-toolbar dark color="indigo" app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="dashboard" tag="span" style="cursor: pointer">
          CRM System
        </router-link> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="profile">
          <v-icon left>account_circle</v-icon>
          {{ username }}
        </v-btn>
        <v-btn icon to="signin" @click="logout()">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- End Toolbar -->
  </v-container>
</template>

<script>
export default {
  props: ["username"],
  data: () => ({
    drawer: false
  }),
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
