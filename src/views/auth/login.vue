<template>
  <div>
    <h1>Login</h1>
    <v-form
      lazy-validation
      v-model="valid"
      ref="form"
      @submit.prevent="handleLogin"
    >
      <v-text-field
        v-model="identifier"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        name="name"
        v-model="password"
        label="Enter your password"
        min="8"
        :rules="[passwordRules.required, passwordRules.min]"
        counter
      ></v-text-field>

      <v-btn type="submit">Login</v-btn>
      <div v-if="error">There is an error</div>
    </v-form>
  </div>
</template>

<script>
// import axios from 'axios';
export default {
  data: () => ({
    identifier: '',
    password: '',
    token: '',
    error: false,
    valid: true,
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: {
      //TODO: Change to 8
      required: (value) => !!value || 'Required.',
      min: (v) => v.length >= 7 || 'Min 7 characters'
    }
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    handleLogin() {
      if (this.valid) {
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
      } else {
        return;
      }
    }
  }
};
</script>

<style></style>
