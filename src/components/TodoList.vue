<template>
  <div class="todo">
    <TodoCreate />
    <div class="todo__list">
      <TodoItem
        v-for="todoItem in todoList"
        :key="todoItem.id"
        :todo="todoItem"
      />
    </div>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todo';
import { mapState } from 'pinia';

import TodoItem from '@/components/TodoItem.vue';
import TodoCreate from '@/components/TodoCreate.vue';

export default {
  components: { TodoCreate, TodoItem },
  computed: {
    ...mapState(useTodoStore, ['todoList']),
  },
};
</script>

<style lang="scss" scoped>
.todo {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

  &__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
