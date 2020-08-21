<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">Workout Mentor</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/exercises">Exercises</b-nav-item>
          <b-nav-item href="/routines">Routines</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>

            <div v-if="!loggedIn">
              <b-dropdown-item href="/auth/register">Register</b-dropdown-item>
              <b-dropdown-item href="/auth/login">Login</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </div>
            <div v-else>
              <b-dropdown-item href="/athlete/dashboard">Dashboard</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div v-if="!loggedIn">You are not logged in</div>
    <div v-else>You are logged in!</div>
  </div>
</template>

<script>
import { authComputed } from "@/store/helpers";

console.log(authComputed);

export default {
  computed: {
    ...authComputed
  },
  methdods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style></style>
