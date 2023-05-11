import { projects } from "./createProject";

export default function deleteProject(project) {
  const index = projects.findIndex((p) => p.title === project.title);

  projects.splice(index, 1);
}
