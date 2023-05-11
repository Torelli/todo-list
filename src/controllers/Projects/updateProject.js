function updateProjectTitle(project, title) {
  if (title && title != project.title) {
    project.title = title;
  } else {
    return false;
  }
}

function updateProjectDescription(project, description) {
  if (description && description != project.description) {
    project.description = description;
  } else {
    return false;
  }
}

function updateProjectDueDate(project, dueDate) {
  if (dueDate && dueDate != project.dueDate) {
    project.dueDate = dueDate;
  } else {
    return false;
  }
}

export default function updateProject(
  project,
  newTitle = null,
  newDescription = null,
  newDueDate = null
) {
  updateProjectTitle(project, newTitle);
  updateProjectDescription(project, newDescription);
  updateProjectDueDate(project, newDueDate);
}

export { updateProjectTitle, updateProjectDescription, updateProjectDueDate };
