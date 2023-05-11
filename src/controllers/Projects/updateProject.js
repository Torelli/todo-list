function updateTitle(project, title) {
  if (title && title != project.title) {
    project.title = title;
  } else {
    return false;
  }
}

function updateDescription(project, description) {
  if (description && description != project.description) {
    project.description = description;
  } else {
    return false;
  }
}

function updateDueDate(project, dueDate) {
  if (dueDate && dueDate != project.dueDate) {
    project.dueDate = dueDate;
  } else {
    return false;
  }
}

const updateProject = {
  title: updateTitle,
  description: updateDescription,
  dueDate: updateDueDate,
};

export default updateProject;
