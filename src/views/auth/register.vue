<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <v-text-field v-model="username" label="username" name="username" value />

      <v-text-field
        v-model="email"
        label="email"
        name="email"
        :rules="emailRules"
        value
      />

      <v-text-field
        v-model="password"
        label="password"
        name="password"
        type="password"
        value
      />

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value
      />

      <div v-if="registerSuccess">
        <p>
          Registration Successful. Please
          <router-link to="/auth/login">login</router-link>&nbsp;with your
          credentials
        </p>
      </div>

      <v-btn type="submit">Register</v-btn>
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
      registerSuccess: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
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
            password: this.password
          })
          .then((success) => {
            console.log(success);
            this.registerSuccess = true;
          })
          .catch((error) => {
            console.log(error);
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
