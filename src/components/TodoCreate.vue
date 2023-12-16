<template>
  <div
    class="create"
    :class="{ create_activate: isActivate }"
    @focusin="isActivate = true"
    @keydown.enter="createTodo"
  >
    <div class="create__inner">
      <PlusIcon v-show="!isActivate" class="create__plus-icon" />
      <TodoStatus
        v-show="isActivate"
        v-model="todo.isDone"
        class="item__status"
      />
      <input
        v-model="todo.text"
        class="create__input"
        type="text"
        maxlength="255"
        placeholder="Add a task"
      />
      <DueDate v-model="todo.date" :today="getCurrentDate()" />
    </div>

    <button class="create__add" type="button">
      <span class="create__add-inner">
        <PlusIcon class="create__add-icon" />
      </span>
    </button>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todo';
import { mapActions } from 'pinia';

import PlusIcon from '@/components/icons/PlusIcon.vue';
import TodoStatus from '@/components/TodoStatus.vue';
import DueDate from '@/components/DueDate.vue';

export default {
  components: {
    PlusIcon,
    TodoStatus,
    DueDate,
  },
  data() {
    return {
      isActivate: false,
      todo: {
        text: '',
        date: this.getCurrentDate(),
        isDone: false,
      },
    };
  },
  methods: {
    ...mapActions(useTodoStore, ['addTodo']),

    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    createTodo() {
      this.todo.id = Date.now().toString();
      this.addTodo(this.todo);

      this.todo = {
        text: '',
        date: this.getCurrentDate(),
        isDone: false,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.create {
  position: relative;
  z-index: 1;
  display: flex;

  &_activate {
    .create {
      &__add {
        transform: translateX(0);
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &__inner {
    display: flex;
    flex-grow: 1;
    align-items: center;
    padding: 0 16px;
    overflow: hidden;
    background: var(--item-bg);
    border-radius: 4px;
  }

  &__plus-icon {
    width: 20px;
    margin: 0 6px;
    color: var(--blue);
  }

  &__input {
    flex-grow: 1;
    padding: 14px 16px;
    overflow: hidden;
    transition: color 0.2s ease-in-out;

    &::placeholder {
      color: var(--blue);
      font-weight: 500;
      transition: color 0.2s ease-in-out;
    }

    &:focus {
      &::placeholder {
        color: var(--white);
      }
    }
  }

  &__add {
    position: relative;
    z-index: -1;
    flex: none;
    box-sizing: content-box;
    height: 50px;
    padding-left: 10px;
    transform: translateX(-100%);
    visibility: hidden;
    opacity: 0;
    transition:
      transform 0.3s 0.2s ease-in-out,
      opacity 0.3s 0.2s ease-in-out,
      visibility 0.3s 0.2s ease-in-out;
    aspect-ratio: 1/1;

    &-inner {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      height: 80%;
      color: #fff;
      background: var(--blue);
      border-radius: 15px;
    }

    &-icon {
      width: 20px;
    }
  }
}
</style>
