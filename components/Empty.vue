<template>
  <div class="border">
    <p class="text">
      There are no {{ selectedCategory }} submitted for the {{ day }}. If you
      are organizing an event during the Berlin Blockchain Week, click 'SUBMIT
      EVENT' button above and fill the form.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: [Number, String],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  computed: {
    // Show events if no category is selected or the name of the category otherwise
    selectedCategory() {
      return this.category !== 'All' ? this.category.toLowerCase() : 'events'
    },
  },
}
</script>

<style lang="scss" scoped>
.border {
  border: 2px solid $grey;
  margin-top: 34px;
  width: 500px;
  height: 200px;
  justify-self: center;
  align-self: center;
  .text {
    padding: 48px;
    font-size: 18px;
    align-self: center;
    justify-self: center;
    color: $dark-grey;
  }
}
.border::before {
  content: '';
  border: 2px solid $grey;
  width: 475px;
  height: 225px;
  background: transparent;
  position: absolute;
  margin-left: 10px;
  margin-top: -15px;
}
@media (max-width: 780px) {
  .border {
    width: 200px;
    height: 370px;
    align-self: flex-start;
    .text {
      padding: 24px;
    }
  }
  .border::before {
    height: 400px;
    width: 175px;
  }
}
</style>
