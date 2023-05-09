import toDosFactory from "../models/todos";

const todos = [];

export default function addTodos(title, description, dueDate, priority, isFinished) {
  todos.push(toDosFactory(title, description, dueDate, priority, isFinished));
}

export { todos };
