<template>
  <button :class="[type, 'button zoom']">
    <div class="content">
      <slot />
    </div>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default',
      validator(value) {
        return ['default', 'primary'].includes(value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 1rem;
  font-family: JoystixMonospace, sans-serif;
  outline: 0;
  text-decoration: none;
  padding: 0;
  cursor: pointer;
  white-space: nowrap;
  text-align: center;
  height: max-content;
}
.content {
  padding: 10px;
}
.default {
  border: 2px solid $black;
  background: $black;
  color: $yellow;
  &:hover {
    transform: scale(1);
  }
}
.primary {
  border: 2px solid $black;
  background: $black;
  color: $yellow;
  &:hover {
    transform: scale(1);
  }
}

.zoom {
  transition: transform 0.2s;
}

.zoom:hover {
  transform: scale(1.05);
}
</style>
