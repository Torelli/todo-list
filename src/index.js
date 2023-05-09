import addProject, { projects } from "./controllers/Projects/addProject";
import showProjectTodos from "./controllers/Projects/showProjectTodos";
import showProjects from "./controllers/Projects/showProjects";
import addTodos from "./controllers/Todos/addTodos"

addTodos(
  projects[0],
  "Default todo",
  "This is a default todo from the 'Home' project",
  new Date(),
  "high",
  false
);

addProject("Test project", "This is a test project", new Date());

addTodos(
    projects[1],
    "Test todo",
    "This is a test todo from the 'Test' project",
    new Date(),
    "low",
    false
  );

showProjects();

showProjectTodos(projects[0]);
showProjectTodos(projects[1]);
