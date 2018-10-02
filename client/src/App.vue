<template>
  <div id="app">
    <v-app>
      <!-- Start Toolbar -->
      <v-toolbar dark color="red darken-3">
        <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

        <v-toolbar-title class="white--text">CRM System</v-toolbar-title>

        <v-spacer></v-spacer>

        
      </v-toolbar>
      <!-- End Toolbar -->
      <main>
        <router-view/>
      </main>
    </v-app>
  </div>
</template>

<style>
</style>
