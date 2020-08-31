<template>
  <div>
    <h1>Dashboard</h1>
    Hello {{ this.$store.getters.getUserData.username }}
    <router-link to="/athlete/activity-history">
      Activity History
    </router-link>
    <router-link to="/athlete/activity-history">
      Activity History
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
