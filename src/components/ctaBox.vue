<template>
  <div class="cta-box" v-bind:class="{ fullWidth: fullWidth }" :style="cssVars">
    <h2 p if="heading">{{ heading }}</h2>
    <p if="body">{{ body }}</p>
    <a if="ctaText" :href="ctaUrl"> {{ ctaText }}</a>
  </div>
</template>

<script>
export default {
  computed: {
    cssVars() {
      return { '--padding': this.padding };
    }
  },
  props: ['heading', 'body', 'ctaText', 'ctaUrl', 'fullWidth', 'padding']
};
</script>

<style>
.cta-box {
  background: rgba(0, 0, 0, 0.5);
  display: inline-block;
  padding: var(--padding);
}
.fullWidth {
  display: block;
  width: 100%;
}
</style>
