const projectsFactory = (
  id,
  icon,
  isPinned,
  title,
  description,
  dueDate,
  todos = []
) => {
  function getProject() {
    return this;
  }

  return { id, icon, isPinned, title, description, dueDate, todos, getProject };
};

export default projectsFactory;
