<template>
  <vSelect
    v-model="selected"
    :clearable="false"
    :filterable="false"
    :options="options"
    :searchable="false"
    class="selector"
    placeholder="Choose an option"
  >
    <template #selected-option-container="{ option }">
      <span class="vs__selected">{{ option.label }}</span>
    </template>

    <template #option="option">
      <span>{{ option.label }}</span>
    </template>
  </vSelect>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    defaultOption: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selected: this.defaultOption,
    }
  },
  watch: {
    selected: {
      handler(selected) {
        this.$emit('update-selected', selected)
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss">
.selector {
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    width: max-content;
    max-width: max-content;
    overflow: hidden;
    padding: 0px 50px;
    background: $black;
    border: 2px solid $black;
    border-radius: 0;
    box-shadow: none;
    color: $yellow;
    font-size: 1rem;
    font-weight: 600;
    border-bottom-color: $black !important;
  }
  .vs__open-indicator {
    font-size: 13px;
    color: $yellow;
  }
  .vs__dropdown-menu {
    background: $black;
    top: 50px;
    padding: 0;
    right: 0;
    border: 2px solid $black;
  }

  .vs__dropdown-option {
    font-size: 1rem;
    padding: 10px;
    margin: 4px;
    font-weight: 600;
    color: $yellow;
  }

  .vs__dropdown-option--highlight {
    background: $dark-grey;
  }

  .vs__clear,
  .vs__open-indicator {
    color: $yellow;
  }

  .image {
    height: 25px;
    vertical-align: middle;
  }
  .vs__selected {
    height: 40px;
    color: $yellow;
    font-weight: 600;
    margin: 0;
    padding: 0 8px 0 0;
  }
  &:hover {
    .vs__selected {
      color: $yellow;
    }
    .vs__open-indicator {
      color: $yellow;
    }
  }
  .vs__actions {
    padding: 8px;
  }
  // remove extra space
  .vs__search {
    padding: 0 !important;
  }
}
// avoid decrease size on open
.vs--single.vs--open .vs__selected {
  opacity: 1 !important;
  position: inherit !important;
  &.vs__dropdown-toggle {
    border-bottom-color: $black !important;
  }
}
</style>
