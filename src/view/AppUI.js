import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";
import TodosUI from "./TodosUI";

function closeContextMenu(e) {
  const dialogs = document.querySelectorAll(".context");
  for (let dialog of dialogs) {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  }
}

function closeDialog() {
  const dialog = document.querySelector("#dialogNewTodo");
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
}

function addTodo(e, project) {
  const title = document.querySelector("#title").value;
  const desc = document.querySelector("#description").value;
  const dueDate = document.querySelector("#due-date").value;
  const priority = document.querySelector("#priority").value;
  if (title !== "") {
    closeDialog();
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
}

export default function AppUI() {
  document.body.appendChild(ProjectUI());
  const todosContainer = document.querySelector("#todos-container");
  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");
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
      document.removeEventListener("mouseup", closeContextMenu);
      document.addEventListener("mouseup", closeContextMenu);
    });

    btnAddTodo.addEventListener("click", (e) => addTodo(e, project));

    btnCloseDialog.addEventListener("click", closeDialog);
    btnCancelDialog.addEventListener("click", closeDialog);
  });
}
