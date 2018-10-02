<template>
  <v-content class="mt-5">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="red darken-3">
              <v-toolbar-title>Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                <v-text-field prepend-icon="assignment_ind" name="fullName" label="Full Name" type="text"></v-text-field>
                <v-text-field id="password" prepend-icon="lock_open" name="password" label="Password" type="password"></v-text-field>
                <v-text-field id="confirmPassword" prepend-icon="lock" name="confirmPassword" label="Confirm Password" type="password"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="white--text red darken-3">Sign Up</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {};
</script>

<style>
</style>
