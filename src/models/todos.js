const toDosFactory = (id, title, description, dueDate, priority, isFinished) => {
  return {id, title, description, dueDate, priority, isFinished };
};

export default toDosFactory;
