import { projects } from "./createProject";

export default function deleteProject(project) {
  const index = projects.indexOf(project);
  projects.splice(index, 1);
}
