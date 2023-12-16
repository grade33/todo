<template>
  <div
    class="item"
    :class="{ item_done: currentTodo.isDone }"
    @keydown.enter="updateTodo"
  >
    <div class="item__inner">
      <TodoStatus v-model="currentTodo.isDone" class="item__status" />
      <span
        ref="editable"
        class="item__text"
        contenteditable="true"
        @input="updateText"
        @paste="handlePaste"
      >
        {{ currentTodo.text }}
      </span>
      <DueDate
        v-model="currentTodo.date"
        class="item__date"
        :today="getCurrentDate()"
      />
    </div>
    <button class="item__del" type="button" @click="deleteTodo">
      <span class="item__del-inner">
        <BasketIcon class="item__del-icon" />
      </span>
    </button>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todo';
import TodoStatus from '@/components/TodoStatus.vue';
import DueDate from '@/components/DueDate.vue';
import BasketIcon from '@/components/icons/BasketIcon.vue';

export default {
  components: { BasketIcon, TodoStatus, DueDate },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentTodo: { ...this.todo },
      isUpdating: false,
    };
  },
  watch: {
    todo: {
      handler(newValue) {
        if (!this.isUpdating) {
          this.currentTodo = { ...newValue };
        }
      },
      immediate: true,
    },
    currentTodo: {
      handler(newValue) {
        this.updateTodo(newValue);
      },
      deep: true,
    },
  },

  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },

    updateTodo() {
      this.isUpdating = true;
      const todoStore = useTodoStore();
      todoStore.updateTodo(this.currentTodo);
      this.isUpdating = false;
    },

    deleteTodo() {
      const todoStore = useTodoStore();
      todoStore.deleteTodo(this.currentTodo);
    },

    updateText(event) {
      this.currentTodo.text = event.target.innerText;
    },
    handlePaste(event) {
      setTimeout(() => {
        const contentEditableElement = event.target;
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentEditableElement);
        range.collapse(false); // false означает перемещение курсора в конец

        selection.removeAllRanges();
        selection.addRange(range);
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  z-index: 1;
  display: flex;

  &__inner {
    display: flex;
    flex-grow: 1;
    align-items: flex-start;
    padding: 0 16px;
    overflow: hidden;
    background: var(--item-bg);
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  &:hover,
  &:focus-within {
    &__inner {
      background: var(--item-bg-hover);
    }

    .item {
      &__del {
        transform: translateX(0);
        visibility: visible;
        opacity: 1;
      }
    }
  }

  &_done {
    .item {
      &__name {
        text-decoration: line-through;
      }
    }
  }

  &__status {
    flex: none;
    height: 50px;
  }

  &__text {
    flex-grow: 1;
    padding: 16px;
    overflow: hidden;
    outline: none;
  }

  &__date {
    flex: none;
    height: 50px;
  }

  &__del {
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
      background: var(--red);
      border-radius: 50%;
    }

    &-icon {
      width: 20px;
    }
  }
}
</style>
