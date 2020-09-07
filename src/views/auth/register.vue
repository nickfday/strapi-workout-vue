<template>
  <div>
    <h1>Register</h1>
    <v-form ref="form" @submit.prevent="register" v-model="valid">
      <v-text-field v-model="username" label="Username" name="username" value />

      <v-text-field
        v-model="email"
        label="Email"
        name="email"
        :rules="rules.emailRules"
        value
      />

      <v-text-field
        v-model="password"
        label="Password"
        name="password"
        type="password"
        :rules="[rules.required, rules.min, passwordConfirmRule]"
        value
      />

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value
      />

      <v-checkbox
        v-model="checkbox"
        label="I Accept the terms and conditions"
        :rules="[rules.required]"
        value
      ></v-checkbox>

      <div v-if="registerSuccess">
        <p>
          Registration Successful. Please
          <router-link to="/auth/login">login</router-link>&nbsp;with your
          credentials
        </p>
      </div>

      <v-btn type="submit" :disabled="!valid">Register</v-btn>
    </v-form>
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
      valid: false,

      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid'
        ]
      }
    };
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        console.log('register');

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
    }
  },
  computed: {
    passwordConfirmRule() {
      return this.password === this.confirmPassword || 'Password must match';
    }
  }
};
</script>

<style></style>
