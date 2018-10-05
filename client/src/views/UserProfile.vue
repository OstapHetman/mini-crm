<template>
  <v-container>
    <v-card class="py-5">
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md7>
            <v-layout row wrap align-center justify-space-around>
              <v-flex xs12 md4 >
                <div style="position: relative">
                  <v-btn color="primary" fab small dark absolute right>
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <img class="profile-image" src="data:image/jpeg;base64,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" alt="">
                </div>
              </v-flex>
              <v-flex xs12 md4>
                <h2 class="blue--text">John Doe</h2>
                <h4>john@doe.com - Customer</h4>
              </v-flex>
            </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap justify-center class="mt-4">
        <v-flex xs12 sm8 md7>
          <h1 class="blue--text">Account</h1>
          <v-form>
            <v-text-field
            label="Username"
            >
            </v-text-field>
            <v-text-field
            label="Full Name"
            >
            </v-text-field>
             <v-text-field
            label="Email"
            >
            </v-text-field>
             <v-text-field
            label="Country"
            >
            </v-text-field>
             <v-text-field
            label="City"
            >
            </v-text-field>
            <v-btn class="success">
              Update
            </v-btn>
            <v-btn class="error" to="dashboard">
              Cancel
            </v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
img.profile-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}
</style>
