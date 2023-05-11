export default function deleteTodo(project, todo) {
  const index = project.todos.findIndex((t) => t.title === todo.title);
  project.todos.splice(index, 1);
}
