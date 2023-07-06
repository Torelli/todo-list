import toDosFactory from "../../models/todos";
import PubSub from "pubsub-js";

export default function createTodo(
  project,
  title,
  description,
  dueDate,
  priority,
  isFinished
) {
  project.todos.push(
    toDosFactory(project.todos.length, title, description, dueDate, priority, isFinished)
  );
}
