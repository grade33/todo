<template>
  <div class="date">
    <input
      :value="modelValue"
      class="date__input"
      type="date"
      name="due-date"
      :min="today"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    today: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style lang="scss" scoped>
.date {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &__input {
    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      cursor: pointer;
      opacity: 0;
    }
  }
}
</style>
