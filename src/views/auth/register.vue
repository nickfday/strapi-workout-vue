<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label for="username">Name:</label>
      <input v-model="username" type="text" name="username" value />

      <label for="email">Email:</label>
      <input v-model="email" type="text" name="email" value />

      <label for="password">Password:</label>
      <input v-model="password" type="text" name="password" value />

      <label for="confirmPassword">Confirm Password:</label>
      <input v-model="confirmPassword" type="text" name="confirmPassword" value />

      <div v-if="registerSuccess">
        <p>
          Registration Successful. Please
          <router-link to="/auth/login">login</router-link>&nbsp;with your credentials
        </p>
      </div>

      <button type="submit" name="button">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      userExists: false,
      registerSuccess: false
    };
  },
  methods: {
    register() {
      console.log("register");
      if (this.valid()) {
        this.$store
          .dispatch("REGISTER", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(success => {
            console.log("success");
            this.registerSuccess = true;
          })
          .catch(error => {
            this.userExists = true;
          });
      }
    },
    valid() {
      return this.password === this.confirmPassword;
    }
  }
};
</script>

<style></style>
