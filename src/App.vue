<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue';

export default {
  components: { TodoList },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  overflow: hidden;
}
</style>
