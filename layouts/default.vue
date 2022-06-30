<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
<style lang="scss">
html {
  background-color: $grey2;
  font-family: 'OpenSauceOne', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  right: 0;
  left: 0;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

hr.onlyDesktop {
  display: block;
}
.onlyDesktop {
  display: initial;
}

.onlyMobile {
  display: none;
}

@media (max-width: 1200px) {
  .onlyDesktop {
    display: none !important;
  }

  hr.onlyMobile {
    display: block;
  }
  .onlyMobile {
    display: initial;
  }
}
</style>
