import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";

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

function getTodos(todos, todosContainer) {
  if (todos.length !== 0) {
    todosContainer.innerText = "";
    for (let todo of todos) {
      const container = document.createElement("div");
      container.classList.add(
        "flex",
        "p-4",
        "border",
        "border-slate-300",
        "w-full",
        "rounded",
        "drop-shadow"
      );

      const titleDesc = document.createElement("div");

      const title = document.createElement("p");
      title.classList.add("text-lg", "bold");
      title.innerText = todo.title;
      titleDesc.appendChild(title);

      const description = document.createElement("p");
      description.classList.add("text-sm", "text-slate-500");
      description.innerText = todo.description;
      titleDesc.appendChild(description);

      container.appendChild(titleDesc);

      todosContainer.appendChild(container);
    }
  } else {
    todosContainer.innerText = "No to-dos yet!";
  }
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
    getTodos(todos, todosContainer);

    PubSub.subscribe("get_todos", () => {
      getTodos(todos, todosContainer);
    });

    btnNewTodo.addEventListener("click", () => {
      createNewTodo(project);
    });
  });
}
