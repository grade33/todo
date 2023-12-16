<template>
  <label class="status">
    <input
      class="status__field visually-hidden"
      type="checkbox"
      name="is-done"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="status__flag">
      <CheckMarkIcon class="status__check-mark" />
    </span>
  </label>
</template>

<script>
import CheckMarkIcon from '@/components/icons/CheckMarkIcon.vue';

export default {
  components: { CheckMarkIcon },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
};
</script>

<style lang="scss" scoped>
.status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;

  &:hover {
    .status__check-mark {
      opacity: 1;
    }
  }

  &__field {
    &:checked + span {
      background: var(--blue);

      .status__check-mark {
        color: var(--item-bg);
        opacity: 1;
      }
    }
  }

  &__flag {
    position: relative;
    display: block;
    width: 20px;
    height: 20px;
    border: 1px solid var(--blue);
    border-radius: 50%;
    transition: background-color 0.2s ease-in-out;
  }

  &__check-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14px;
    color: var(--blue);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition:
      color 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
  }
}
</style>
