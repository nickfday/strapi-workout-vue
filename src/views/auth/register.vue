<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <label for="username">
        Name:
      </label>
      <input v-model="username" type="text" name="username" value />

      <label for="email">
        Email:
      </label>
      <input v-model="email" type="text" name="email" value />

      <label for="password">
        Password:
      </label>
      <input v-model="password" type="text" name="password" value />

      <label for="confirmPassword">
        Confirm Password:
      </label>
      <input
        v-model="confirmPassword"
        type="text"
        name="confirmPassword"
        value
      />

      <button type="submit" name="button">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userExists: false,
    };
  },
  methods: {
    register() {
      console.log('register');
      if (this.valid()) {
        this.$store
          .dispatch('REGISTER', {
            username: this.username,
            email: this.email,
            password: this.password,
          })
          .then(({ status }) => {
            this.$store.commit('SET_NOTIFICATION', {
              display: true,
              message: 'Your account has been successfully created',
            });
            this.$router.push('/auth/login');
          })
          .catch((error) => {
            this.userExists = true;
          });
      }
    },
    valid() {
      return this.password === this.confirmPassword;
    },
  },
};
</script>

<style></style>
