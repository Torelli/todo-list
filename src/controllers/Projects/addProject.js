import projectsFactory from "../../models/projects";

const projects = [projectsFactory("Home", "Your default todos", null)];

export default function addProject(title, description, dueDate) {
  projects.push(projectsFactory(title, description, dueDate));
}

export { projects };
