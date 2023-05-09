const projectsFactory = (title, description, dueDate, todos = []) => {
  return { title, description, dueDate, todos };
};

export default projectsFactory;
