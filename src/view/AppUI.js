import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";
import TodosUI, { formatDueDate } from "./TodosUI";

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

function openSidebar(todo) {
  const sidebar = document.querySelector("#todo-sidebar");
  const sidebarTitle = document.querySelector("#sidebar-title");
  const sidebarDescription = document.querySelector("#sidebar-description");

  sidebarTitle.innerText = todo.title;
  sidebarDescription.innerText = "This to do has no description";
  if (todo.description != "") sidebarDescription.innerText = todo.description;

  sidebar.classList.remove("translate-x-full");
}

function closeSidebar(e) {
  const sidebar = document.querySelector("#todo-sidebar");
  sidebar.classList.add("translate-x-full");
}

function openEditInputs(id) {
  const dialog = document.querySelector(`#optionsDialog${id}`);
  const container = document.querySelector(`#todo-row-${id}`);
  const btnOptions = document.querySelector(`#btn-options-${id}`);
  const btnSave = document.querySelector(`#btn-save-${id}`);
  const btnCancel = document.querySelector(`#btn-cancel-${id}`);
  const title = document.querySelector(`#title-input-${id}`);
  const description = document.querySelector(`#desc-input-${id}`);
  const date = document.querySelector(`#date-input-${id}`);
  const priority = document.querySelector(`#priority-input-${id}`);
  const priorityBadge = document.querySelector(`#priority-badge-${id}`);

  dialog.close();

  container.classList.add("bg-slate-200");
  container.classList.remove("hover:bg-slate-100/50");

  btnOptions.classList.add("hidden");
  btnSave.classList.remove("hidden");
  btnCancel.classList.remove("hidden");

  title.disabled = false;
  title.setAttribute("placeholder", "Title");

  description.disabled = false;
  description.setAttribute("placeholder", "Description");

  date.disabled = false;

  priority.classList.remove("hidden");
  priorityBadge.classList.add("hidden");
}

function closeEditInputs(id, todo) {
  const container = document.querySelector(`#todo-row-${id}`);
  const btnOptions = document.querySelector(`#btn-options-${id}`);
  const btnSave = document.querySelector(`#btn-save-${id}`);
  const btnCancel = document.querySelector(`#btn-cancel-${id}`);
  const title = document.querySelector(`#title-input-${id}`);
  const description = document.querySelector(`#desc-input-${id}`);
  const date = document.querySelector(`#date-input-${id}`);
  const priority = document.querySelector(`#priority-input-${id}`);
  const priorityBadge = document.querySelector(`#priority-badge-${id}`);

  container.classList.remove("bg-slate-200");
  container.classList.add("hover:bg-slate-100/50");

  btnOptions.classList.remove("hidden");
  btnSave.classList.add("hidden");
  btnCancel.classList.add("hidden");

  title.disabled = true;
  title.value = todo.title;

  description.disabled = true;
  description.value = todo.description;

  date.disabled = true;
  date.value = formatDueDate(todo.dueDate);

  priority.classList.add("hidden");
  priorityBadge.classList.remove("hidden");
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
  const btnCloseSidebar = document.querySelector("#btn-close-sidebar");

  PubSub.subscribe("get_project", (msg, project) => {
    const todos = project.todos;
    projectTitle.innerText = project.title;
    projectDescription.innerText = project.description;

    PubSub.subscribe("get_todos", () => {
      TodosUI(todos, todosContainer);
      document.removeEventListener("mouseup", closeContextMenu);
      document.addEventListener("mouseup", closeContextMenu);

      const btnsViewTodo = document.querySelectorAll(".context-view");
      for (let button of btnsViewTodo) {
        const todo =
          todos[
            button.parentNode.parentNode.parentNode.getAttribute("data-id")
          ];
        button.removeEventListener("click", () => openSidebar(todo));
        button.addEventListener("click", () => openSidebar(todo));
      }

      const btnsEditTodo = document.querySelectorAll(".context-edit");
      for (let button of btnsEditTodo) {
        const id =
          button.parentNode.parentNode.parentNode.getAttribute("data-id");
        button.addEventListener("click", () => openEditInputs(id));
      }

      const btnsCancelEdit = document.querySelectorAll(".btn-cancel-edit");
      for (let button of btnsCancelEdit) {
        const id = button.parentNode.parentNode.getAttribute("data-id");
        button.addEventListener("click", () => closeEditInputs(id, todos[id]));
      }
    });

    btnAddTodo.addEventListener("click", (e) => addTodo(e, project));

    btnCloseSidebar.addEventListener("click", closeSidebar);

    btnCloseDialog.addEventListener("click", closeDialog);
    btnCancelDialog.addEventListener("click", closeDialog);
  });
}
