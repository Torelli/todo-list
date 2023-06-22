import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";
import TodosUI from "./TodosUI";

export default function AppUI() {
  document.body.appendChild(ProjectUI());
  const todosContainer = document.querySelector("#todos-container");
  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");
  const dialog = document.querySelector("#dialogNewTodo");
  const btnCloseDialog = document.querySelector("#btn-close-dialog");
  const btnCancelDialog = document.querySelector("#btn-cancel");
  const btnAddTodo = document.querySelector("#btn-add");

  PubSub.subscribe("get_project", (msg, project) => {
    const todos = project.todos;
    projectTitle.innerText = project.title;
    projectDescription.innerText = project.description;
    TodosUI(todos, todosContainer);

    PubSub.subscribe("get_todos", () => {
      TodosUI(todos, todosContainer);
    });

    btnAddTodo.addEventListener("click", (e) => {
      const title = document.querySelector("#title").value;
      const desc = document.querySelector("#description").value;
      const dueDate = document.querySelector("#due-date").value;
      const priority = document.querySelector("#priority").value;
      if (title !== "") {
        btnCancelDialog.click();
        e.preventDefault();
        PubSub.publish("new_todo", [
          project,
          title,
          desc,
          new Date(dueDate),
          priority,
          false,
        ]);
        document.querySelector("#title").value = "";
        document.querySelector("#description").value = "";
        document.querySelector("#due-date").value = "";
        document.querySelector("#priority").value = "High";
      }
    });

    btnCloseDialog.onclick = function () {
      dialog.classList.add("hide");
      dialog.addEventListener(
        "webkitAnimationEnd",
        function animationEnd() {
          dialog.classList.remove("hide");
          dialog.close();
          dialog.removeEventListener("webkitAnimationEnd", animationEnd, false);
        },
        false
      );
    };
    btnCancelDialog.onclick = function () {
      dialog.classList.add("hide");
      dialog.addEventListener(
        "webkitAnimationEnd",
        function animationEnd() {
          dialog.classList.remove("hide");
          dialog.close();
          dialog.removeEventListener("webkitAnimationEnd", animationEnd, false);
        },
        false
      );
    };
  });
}
