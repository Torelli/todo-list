import createProject, { projects } from "./Projects/createProject";
import getProjects from "./Projects/getProjects";
import updateProject from "./Projects/updateProject";
import deleteProject from "./Projects/deleteProject";
import createTodo from "./Todos/createTodo";
import updateTodo from "./Todos/updateTodo";
import deleteTodo from "./Todos/deleteTodo";

export default function Controller() {
  PubSub.publish("get_project", projects[0].getProject());
  PubSub.subscribe("new_todo", (msg, data) => {
    createTodo(data[0], data[1], data[2], data[3], data[4], data[5]);
    PubSub.publish("get_todos");
  });
  PubSub.subscribe("update_todo", (msg, data) => {
    updateTodo.title(data[0], data[1]);
    updateTodo.description(data[0], data[2]);
    updateTodo.dueDate(data[0], data[3]);
    updateTodo.priority(data[0], data[4]);
    PubSub.publish("get_todos");
  });
  PubSub.subscribe("delete_todo", (msg, data) => {
    deleteTodo(data.project, data.todo);
    PubSub.publish("get_todos");
  });
}
