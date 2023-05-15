import createProject, { projects } from "./controllers/Projects/createProject";
import getProjects from "./controllers/Projects/getProjects";
import updateProject from "./controllers/Projects/updateProject";
import deleteProject from "./controllers/Projects/deleteProject";
import createTodo from "./controllers/Todos/createTodo";
import updateTodo from "./controllers/Todos/updateTodo";
import deleteTodo from "./controllers/Todos/deleteTodo";
import AppUI from "./view/AppUI";
import PubSub from "pubsub-js";

document.addEventListener("DOMContentLoaded", () => {
  AppUI();
  projects[0].getProject();
  PubSub.subscribe("new_todo", (msg, data) => {
    createTodo(data[0], data[1], data[2], data[3], data[4], data[5]);
    PubSub.publish("get_todos");
  });
});
