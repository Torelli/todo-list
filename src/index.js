import createProject, { projects } from "./controllers/Projects/createProject";
import getProjects from "./controllers/Projects/getProjects";
import updateProject from "./controllers/Projects/updateProject";
import createTodo from "./controllers/Todos/createTodo";
import getTodos from "./controllers/Todos/getTodos";

createTodo(
  projects[0],
  "Default todo",
  "This is a default todo from the 'Home' project",
  new Date(),
  "high",
  false
);

createProject("Test project", "This is a test project", new Date());

createTodo(
  projects[1],
  "Test todo",
  "This is a test todo from the 'Test' project",
  new Date(),
  "low",
  false
);

getProjects();

getTodos(projects[0]);
getTodos(projects[1]);

updateProject(projects[1], "Work", "Work related todos", new Date("1995-12-17T03:24:00"));

getProjects();
