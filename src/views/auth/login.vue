<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label for="email">Email:</label>
      <input v-model="identifier" type="text" name="identifier" value />

      <label for="password">Password:</label>
      <input v-model="password" type="text" name="password" value />
      <button type="submit" name="button">Login</button>
      <div v-if="error">There is an error</div>
    </form>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data: () => ({
    identifier: '',
    password: '',
    token: '',
    error: false
  }),

  methods: {
    handleLogin() {
      this.$store
        .dispatch('LOGIN', {
          identifier: this.identifier,
          password: this.password
        })
        .then((success) => {
          console.log(success);
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
        });
    }
  }
};
</script>

<style></style>
