import projectsFactory from "../../models/projects";

const projects = [
  projectsFactory(0, "fa-house", true, "Home", "Your default todos", null),
];

export default function createProject(title, description, dueDate) {
  projects.push(
    projectsFactory(
      projects.length,
      "fa-list",
      false,
      title,
      description,
      dueDate
    )
  );
}

export { projects };
