<template>
  <div class="fill-height d-flex" :class="[wrapperClasses]">
    <div
      class="cta-box"
      v-bind:class="{ fullWidth: fullWidth }"
      :style="cssVars"
    >
      <h2 p if="heading">{{ heading }}</h2>
      <p if="body">{{ body }}</p>
      <a if="ctaText" :href="ctaUrl"> {{ ctaText }}</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cssVars() {
      return { '--padding': this.padding };
    }
  },
  props: [
    'heading',
    'body',
    'ctaText',
    'ctaUrl',
    'fullWidth',
    'padding',
    'wrapperClasses'
  ]
};
</script>

<style>
.cta-box {
  background: rgba(0, 0, 0, 0.7);
  display: inline-block;
  padding: var(--padding);
}

.fullWidth {
  display: block;
  width: 100%;
}
</style>
