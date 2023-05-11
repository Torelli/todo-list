import createProject, { projects } from "./controllers/Projects/createProject";
import getProjects from "./controllers/Projects/getProjects";
import updateProject from "./controllers/Projects/updateProject";
import deleteProject from "./controllers/Projects/deleteProject";
import createTodo from "./controllers/Todos/createTodo";
import getTodos from "./controllers/Todos/getTodos";
import updateTodo from "./controllers/Todos/updateTodo";

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

updateProject.title(projects[1], "Work");
updateProject.description(projects[1], "Work related todos");
updateProject.dueDate(projects[1], new Date("1995-12-17T03:24:00"));

getProjects();

updateTodo.title(projects[1].todos[0], "Work todo");
console.log(getTodos(projects[1])[0]);

createProject("Deleted project", "This project will be deleted", new Date());
getProjects();
deleteProject(projects[2]);
getProjects();
