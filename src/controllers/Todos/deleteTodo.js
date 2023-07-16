export default function deleteTodo(project, todo) {
  const index = project.todos.findIndex((t) => t.id === todo.id);
  project.todos.splice(index, 1);
}
