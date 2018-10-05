<template>
  <div id="app">
    <v-app>
      <main class="mt-5">
        <router-view/>
      </main>
      <v-footer color="indigo" app>
        <v-container class="my-0">
          <p class="white--text text-xs-center mb-0">CRM &copy; 2018</p>
        </v-container>
      </v-footer>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({})
};
</script>


<style>
</style>
