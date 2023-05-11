function updateTodoTitle(todo, title) {
  if (title && title != todo.title) {
    todo.title = title;
  } else {
    return false;
  }
}

export default function updateTodo(
  todo,
  newTitle,
  newDescription,
  newDueDate,
  newPriority,
  newIsFinished
) {}
