const toDosFactory = (title, description, dueDate, priority, isFinished) => {
  return { title, description, dueDate, priority, isFinished };
};

export default toDosFactory;
