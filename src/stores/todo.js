import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: JSON.parse(localStorage.getItem('todoList')) || [],
  }),
  actions: {
    addTodo(item) {
      this.todoList.push(item);
      this.sortTodos();
      this.saveTodos();
    },

    updateTodo(updatedTodo) {
      const index = this.todoList.findIndex(
        (todo) => updatedTodo.id === todo.id
      );
      if (index !== -1) {
        this.todoList[index] = { ...this.todoList[index], ...updatedTodo };
      }

      this.sortTodos();
      this.saveTodos();
    },

    deleteTodo(currentTodo) {
      this.todoList = this.todoList.filter(
        (todo) => todo.id !== currentTodo.id
      );
      this.saveTodos();
    },

    saveTodos() {
      localStorage.setItem('todoList', JSON.stringify(this.todoList));
    },

    sortTodos() {
      // Сортируем напрямую todoList
      this.todoList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (a.isDone === b.isDone) {
          return dateA - dateB;
        }
        return a.isDone ? 1 : -1;
      });
    },
  },
});
