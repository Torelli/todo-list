import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";
import TodosUI from "./TodosUI";

function createNewTodo(project) {
  PubSub.publish("new_todo", [
    project,
    "Test todo",
    "This is just a test",
    new Date(),
    "High",
    false,
  ]);
}

export default function AppUI() {
  document.body.appendChild(ProjectUI());
  const todosContainer = document.querySelector("#todos-container");
  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");
  const btnNewTodo = document.querySelector("#btn-new-todo");

  PubSub.subscribe("get_project", (msg, project) => {
    const todos = project.todos;
    projectTitle.innerText = project.title;
    projectDescription.innerText = project.description;
    TodosUI(todos, todosContainer);

    PubSub.subscribe("get_todos", () => {
      TodosUI(todos, todosContainer);
    });

    btnNewTodo.addEventListener("click", () => {
      createNewTodo(project);
    });
  });
}
