<template>
  <v-layout row>
    <v-flex xs12>
      <v-jumbotron>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <h3 class="primary--text display-3">Welcome to our CRM System !</h3>

              <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>

              <v-divider class="my-3"></v-divider>

              <div class="title mb-3">Check out our system</div>

              <v-btn
                class="mx-0"
                color="primary"
                large
                to="/signup"
              >
                Sign UP
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "home"
};
</script>
