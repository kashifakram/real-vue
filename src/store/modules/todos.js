export const state = {
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false },
    { id: 3, text: '...', done: true },
    { id: 4, text: '...', done: false },
    { id: 5, text: '...', done: true },
    { id: 6, text: '...', done: false }
  ]
};

export const getters = {
  completedTasks: s => s.todos.filter(td => td.done),
  activeTasks: s => s.todos.filter(td => !td.done),
  totalCompletedTasks: (s, g) => g.completedTasks.length,
  totalActiveTasks: (s, g) => s.todos.length - g.totalCompletedTasks,
  getTaskById: s => id => s.todos.find(td => td.id === id)
};
