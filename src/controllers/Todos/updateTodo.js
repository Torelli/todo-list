function updateTitle(todo, title) {
  if (title && title != todo.title) {
    todo.title = title;
  } else {
    return false;
  }
}

function updateDescription(todo, description) {
  if (description && description != todo.description) {
    todo.description = description;
  } else {
    return false;
  }
}

function updateDueDate(todo, dueDate) {
  if (dueDate && dueDate != todo.dueDate) {
    todo.dueDate = dueDate;
  } else {
    return false;
  }
}

function updatePriority(todo, priority) {
  if (priority && priority != todo.priority) {
    todo.priority = priority;
  } else {
    return false;
  }
}

function updateIsFinished(todo, isFinished) {
  if (isFinished && isFinished != todo.isFinished) {
    todo.isFinished = isFinished;
  } else {
    false;
  }
}

const updateTodo = {
  title: updateTitle,
  description: updateDescription,
  dueDate: updateDueDate,
  priority: updatePriority,
  isFinished: updateIsFinished,
};

export default updateTodo;
