import PubSub from "pubsub-js";
import ProjectUI from "./ProjectUI";
import TodosUI, { formatDueDate } from "./TodosUI";
import ProjectSidebarUI from "./ProjectSidebarUI";

function populateProjectSidebarUI(projects) {
  const btnCollapseSidebar = document.querySelector("#btn-collapse-sidebar");
  const btnToggleInput = document.querySelector("#btn-toggle-input");
  const btnAddProject = document.querySelector("#btn-add-project");

  btnCollapseSidebar.addEventListener("click", toggleSidebar);

  btnToggleInput.addEventListener("click", toggleProjectInput);

  btnAddProject.addEventListener("click", addProject);

  const pinnedProjectsContainer = document.querySelector(
    "#pinned-projects-container"
  );
  const unpinnedProjectsContainer = document.querySelector(
    "#unpinned-projects-container"
  );

  pinnedProjectsContainer.innerHTML = "";
  unpinnedProjectsContainer.innerHTML = `<div id="unpinned-title" class="w-full py-2 px-[0.9rem] flex gap-4 items-center"><i class="fa-solid fa-bars-staggered fa-lg"></i><span>Other Projects</span></div><div class="h-full overflow-y-auto"></div>`;

  for (let project of projects) {
    const btnProject = document.createElement("div");
    btnProject.classList.add(
      "w-full",
      "py-2",
      "px-[0.9rem]",
      "flex",
      "justify-between",
      "items-center",
      "hover:bg-slate-800/25"
    );
    if (project.isPinned) {
      btnProject.innerHTML = `<button data-id="${project.id}" class="btn-open-project flex items-center gap-4"><i class="fa-solid ${project.icon} fa-lg"></i><span class="transition-all">${project.title}</span></button><button><i class="fa-solid fa-ellipsis"></i></button>`;
      pinnedProjectsContainer.appendChild(btnProject);
    } else {
      btnProject.innerHTML = `<button data-id="${project.id}" class="btn-open-project flex gap-4"><span class="transition-all">${project.title}</span></button><button><i class="fa-solid fa-ellipsis"></i></button>`;
      unpinnedProjectsContainer.children[1].appendChild(btnProject);
    }
  }

  const btnsOpenProject = document.querySelectorAll(".btn-open-project");

  for (let button of btnsOpenProject) {
    button.addEventListener("click", () =>
      viewProject(button.getAttribute("data-id"))
    );
  }
}

function viewProject(id) {
  PubSub.publish("view_project", id);
}

function refreshProjectEventListeners() {
  const oldBtnCloseDialog = document.querySelector("#btn-close-dialog");
  const oldBtnCancelDialog = document.querySelector("#btn-cancel");
  const oldBtnAddTodo = document.querySelector("#btn-add");
  const oldBtnCloseSidebar = document.querySelector("#btn-close-sidebar");

  const newBtnCloseDialog = oldBtnCloseDialog.cloneNode(true);
  const newBtnCancelDialog = oldBtnCancelDialog.cloneNode(true);
  const newBtnAddTodo = oldBtnAddTodo.cloneNode(true);
  const newBtnCloseSidebar = oldBtnCloseSidebar.cloneNode(true);

  oldBtnCloseDialog.parentNode.replaceChild(
    newBtnCloseDialog,
    oldBtnCloseDialog
  );
  oldBtnCancelDialog.parentNode.replaceChild(
    newBtnCancelDialog,
    oldBtnCancelDialog
  );
  oldBtnAddTodo.parentNode.replaceChild(newBtnAddTodo, oldBtnAddTodo);
  oldBtnCloseSidebar.parentNode.replaceChild(
    newBtnCloseSidebar,
    oldBtnCloseSidebar
  );
}

function populateProjectUI(project) {
  refreshProjectEventListeners();

  const btnCloseDialog = document.querySelector("#btn-close-dialog");
  const btnCancelDialog = document.querySelector("#btn-cancel");
  const btnAddTodo = document.querySelector("#btn-add");
  const btnCloseSidebar = document.querySelector("#btn-close-sidebar");

  btnAddTodo.addEventListener("click", (e) => addTodo(e, project));

  btnCloseSidebar.addEventListener("click", closeSidebar);

  btnCloseDialog.addEventListener("click", closeDialog);
  btnCancelDialog.addEventListener("click", closeDialog);

  const projectTitle = document.querySelector("#project-title");
  const projectDescription = document.querySelector("#project-description");

  projectTitle.innerHTML = `<i class="fa-solid ${project.icon}"></i>${project.title}`;
  projectDescription.innerText = project.description;
}

function populateTodosUI(project) {
  const todosContainer = document.querySelector("#todos-container");
  const todos = project.todos;

  TodosUI(todos, todosContainer);
  document.removeEventListener("mouseup", closeContextMenu);
  document.addEventListener("mouseup", closeContextMenu);

  const btnsViewTodo = document.querySelectorAll(".context-view");
  for (let button of btnsViewTodo) {
    const id = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    button.removeEventListener("click", () =>
      openSidebar(todos[todos.findIndex((t) => t.id == id)])
    );
    button.addEventListener("click", () =>
      openSidebar(todos[todos.findIndex((t) => t.id == id)])
    );
  }

  const btnsEditTodo = document.querySelectorAll(".context-edit");
  for (let button of btnsEditTodo) {
    const id = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    button.addEventListener("click", () => openEditInputs(id));
  }

  const btnsCancelEdit = document.querySelectorAll(".btn-cancel-edit");
  for (let button of btnsCancelEdit) {
    const id = button.parentNode.parentNode.getAttribute("data-id");
    button.addEventListener("click", () =>
      closeEditInputs(id, todos[todos.findIndex((t) => t.id == id)])
    );
  }

  const todoForm = document.querySelectorAll(".todo-form");
  for (let form of todoForm) {
    const id = form.getAttribute("data-id");
    form.addEventListener("submit", (e) =>
      updateTodo(e, id, todos[todos.findIndex((t) => t.id == id)])
    );
  }

  const btnsDeleteTodo = document.querySelectorAll(".context-delete");
  for (let button of btnsDeleteTodo) {
    const id = button.parentNode.parentNode.parentNode.getAttribute("data-id");
    button.addEventListener("click", () =>
      deleteTodo(project, todos[todos.findIndex((t) => t.id == id)])
    );
  }

  const btnsChangeStatus = document.querySelectorAll(".btn-status");
  for (let button of btnsChangeStatus) {
    const id = button.parentNode.getAttribute("data-id");
    button.addEventListener("click", () =>
      updateTodoStatus(todos[todos.findIndex((t) => t.id == id)])
    );
  }
}

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
  const container = document.querySelector(`#todo-form-${id}`);
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
  const container = document.querySelector(`#todo-form-${id}`);
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

function addProject(e) {
  const title = document.querySelector("#input-project-title").value;
  const description = document.querySelector(
    "#input-project-description"
  ).value;
  const dueDate = document.querySelector("#input-project-due-date").value;
  let formattedDate = dueDate;

  if (dueDate != "") formattedDate = new Date(dueDate);

  if (title != "") {
    e.preventDefault();
    PubSub.publish("new_project", { title, description, formatDueDate });
    document.querySelector("#input-project-title").value = "";
    document.querySelector("#input-project-description").value = "";
    document.querySelector("#input-project-due-date").value = "";
  }
}

function addTodo(e, project) {
  const title = document.querySelector("#title").value;
  const desc = document.querySelector("#description").value;
  const dueDate = document.querySelector("#due-date").value;
  const priority = document.querySelector("#priority").value;
  let formattedDate = dueDate;

  if (dueDate != "") formattedDate = new Date(dueDate);

  if (title != "") {
    closeDialog();
    e.preventDefault();
    PubSub.publish("new_todo", [
      project,
      title,
      desc,
      formattedDate,
      priority,
      false,
    ]);
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#due-date").value = "";
    document.querySelector("#priority").value = "High";
  }
}

function updateTodo(e, id, todo) {
  const title = document.querySelector(`#title-input-${id}`).value;
  const description = document.querySelector(`#desc-input-${id}`).value;
  const date = document.querySelector(`#date-input-${id}`).value;
  const priority = document.querySelector(`#priority-input-${id}`).value;
  let formattedDate = date;

  if (date != "") formattedDate = new Date(date);

  if (title != "") {
    e.preventDefault();
    PubSub.publish("update_todo", [
      todo,
      title,
      description,
      formattedDate,
      priority,
    ]);
  }
}

function deleteTodo(project, todo) {
  PubSub.publish("delete_todo", { project, todo });
}

function updateTodoStatus(todo) {
  const btnStatusIcon = document.querySelector(`#status-${todo.id}`).children[0]
    .children[0];
  const btnStatusTooltip = document.querySelector(`#status-${todo.id}`)
    .children[0].children[1];
  let status;
  if (todo.isFinished) {
    status = false;
    btnStatusIcon.setAttribute("state", "morph-check-out");

    btnStatusTooltip.classList.remove(
      "bg-green-300",
      "text-green-800",
      "-left-4"
    );
    btnStatusTooltip.classList.add("bg-red-300", "text-red-800", "-left-6");
    btnStatusTooltip.innerText = "Unfinished";
  } else {
    status = true;
    btnStatusIcon.setAttribute("state", "morph-check-in");

    btnStatusTooltip.classList.remove("bg-red-300", "text-red-800", "-left-6");
    btnStatusTooltip.classList.add("bg-green-300", "text-green-800", "-left-4");
    btnStatusTooltip.innerText = "Finished";
  }
  PubSub.publish("update_todo_status", { todo, status });
}

function openProjectsSidebar() {
  const btnCollapseSidebar = document.querySelector("#btn-collapse-sidebar");
  const btnCollapseSidebarIcon = btnCollapseSidebar.children[0];
  const unpinnedProjectsContainer = document.querySelector(
    "#unpinned-projects-container"
  );

  for (let project of unpinnedProjectsContainer.children) {
    if (project.getAttribute("id") != "unpinned-title") {
      project.classList.remove("opacity-0");
      project.classList.add("opacity-100");
    }
  }

  btnCollapseSidebar.classList.remove("text-center");
  btnCollapseSidebar.classList.add("text-right");

  btnCollapseSidebarIcon.classList.add("-scale-100");

  document.body.classList.remove("grid-cols-[50px_auto]");
  document.body.classList.add(
    "sm:grid-cols-[20%_auto]",
    "grid-cols-[60%_auto]"
  );
}

function closeProjectsSidebar() {
  const btnCollapseSidebar = document.querySelector("#btn-collapse-sidebar");
  const btnCollapseSidebarIcon = btnCollapseSidebar.children[0];
  const unpinnedProjectsContainer = document.querySelector(
    "#unpinned-projects-container"
  );

  for (let project of unpinnedProjectsContainer.children) {
    if (project.getAttribute("id") != "unpinned-title") {
      project.classList.remove("opacity-100");
      project.classList.add("opacity-0");
    }
  }
  btnCollapseSidebar.classList.remove("text-right");
  btnCollapseSidebar.classList.add("text-center");

  btnCollapseSidebarIcon.classList.remove("-scale-100");

  document.body.classList.remove(
    "sm:grid-cols-[20%_auto]",
    "grid-cols-[60%_auto]"
  );
  document.body.classList.add("grid-cols-[50px_auto]");
}

function toggleSidebar() {
  const btnCollapseSidebarIcon = document.querySelector("#btn-collapse-sidebar")
    .children[0];
  if (btnCollapseSidebarIcon.classList.contains("-scale-100")) {
    closeProjectsSidebar();
    closeProjectInput();
  } else {
    openProjectsSidebar();
  }
}

function openProjectInput() {
  const unpinnedProjectsContainer = document.querySelector(
    "#unpinned-projects-container"
  );
  const btnToggleInput = document.querySelector("#btn-toggle-input");
  const btnToggleInputText = btnToggleInput.children[1];
  const btnToggleInputIcon = btnToggleInput.children[0];
  const formCreateProject = document.querySelector("#form-create-project");
  const inputElements = formCreateProject.children;
  const inputTitle = document.querySelector("#input-project-title");
  const btnCollapseSidebar = document.querySelector("#btn-collapse-sidebar");

  unpinnedProjectsContainer.classList.replace("h-[30%]", "h-[19%]");

  btnToggleInputIcon.classList.replace("fa-circle-plus", "fa-circle-minus");

  if (btnCollapseSidebar.classList.contains("text-center"))
    openProjectsSidebar();

  formCreateProject.classList.replace("max-h-0", "max-h-60");
  formCreateProject.classList.replace("p-0", "px-4");

  for (let input of inputElements) {
    input.disabled = false;
  }

  btnToggleInputText.innerText = "Cancel";

  inputTitle.focus();
}

function closeProjectInput() {
  const unpinnedProjectsContainer = document.querySelector(
    "#unpinned-projects-container"
  );
  const btnToggleInput = document.querySelector("#btn-toggle-input");
  const btnToggleInputText = btnToggleInput.children[1];
  const btnToggleInputIcon = btnToggleInput.children[0];
  const formCreateProject = document.querySelector("#form-create-project");
  const inputElements = formCreateProject.children;
  const inputTitle = document.querySelector("#input-project-title");
  const inputDescription = document.querySelector("#input-project-description");
  const inputDueDate = document.querySelector("#input-project-due-date");

  inputTitle.value = "";
  inputDescription.value = "";
  inputDueDate.value = "";

  unpinnedProjectsContainer.classList.replace("h-[19%]", "h-[30%]");

  btnToggleInputIcon.classList.replace("fa-circle-minus", "fa-circle-plus");

  for (let input of inputElements) {
    input.disabled = false;
  }

  formCreateProject.classList.replace("max-h-60", "max-h-0");
  formCreateProject.classList.replace("px-4", "p-0");

  btnToggleInputText.innerText = "Create Project";
}

function toggleProjectInput() {
  const btnToggleInput = document.querySelector("#btn-toggle-input");
  const btnToggleInputIcon = btnToggleInput.children[0];

  if (btnToggleInputIcon.classList.contains("fa-circle-minus")) {
    closeProjectInput();
  } else {
    openProjectInput();
  }
}

export default function AppUI() {
  document.body.appendChild(ProjectSidebarUI());
  document.body.appendChild(ProjectUI());

  PubSub.subscribe("get_projects", (msg, projects) => {
    populateProjectSidebarUI(projects);
  });

  PubSub.subscribe("get_project", (msg, project) => {
    populateProjectUI(project);

    populateTodosUI(project);

    PubSub.subscribe("get_todos", () => populateTodosUI(project));
  });
}
