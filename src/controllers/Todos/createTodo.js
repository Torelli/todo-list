import toDosFactory from "../../models/todos";

export default function createTodo(
  project,
  title,
  description,
  dueDate,
  priority,
  isFinished
) {
  project.todos.push(
    toDosFactory(title, description, dueDate, priority, isFinished)
  );
}
