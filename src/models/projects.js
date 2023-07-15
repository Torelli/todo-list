const projectsFactory = (title, description, dueDate, todos = []) => {
  function getProject() {
    return this;
  }

  return { title, description, dueDate, todos, getProject };
};

export default projectsFactory;
