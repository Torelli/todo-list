import { projects } from "./addProject";

export default function showProjectTodos(project) {
  console.table(project.todos);
}
