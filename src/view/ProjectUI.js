function populateDialog() {
  const dialogWithin = `<div class="bg-slate-100 px-4 py-3 flex justify-between sm:px-6">
              <div class="flex items-center sm:justify-around sm:gap-1">
                <div
                  class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                  <i id="dialog-icon" class="fa-solid fa-circle-plus text-2xl text-slate-700"></i>
                </div>
                <div class="text-center sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6" id="dialog-title">Add a new
                    To do</h3>
                </div>
              </div>
              <button type="button" id="btn-close-dialog">
              <i class="fa-regular fa-circle-xmark text-slate-400 text-xl"></i>
              </button>
            </div>
            <div class="bg-white px-4 pt-5 pb-4 sm:px-6 sm:pt-0 flex flex-col items-center mt-2">
            <form class="w-3/4 pt-6" id="form-new-todo" action="">
              <div class="w-full relative mb-6">
                <input
                  class="w-full p-1 rounded bg-white border border-slate-400 mb-4 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                  name="title" id="title" placeholder="Title *" type="text" required>
                <label id="lbl-title" data-help="* This is a required field"
                  class="opacity-0 peer-focus-visible:opacity-100 peer-focus-visible:animate-fade py-1 text-sm absolute bottom-12 left-1 peer-focus-visible:after:content-[attr(data-help)] peer-focus-visible:peer-invalid:after:animate-help peer-focus-visible:peer-valid:after:opacity-0 transition-all after:absolute after:left-0 after:top-16 after:whitespace-nowrap"
                  for="title">Title
                </label>
              </div>
              <div class="w-full relative mb-6">
                <textarea
                  class="w-full h-32 p-1 rounded resize-none bg-white border border-slate-400 mb-4 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                  name="description" id="description" placeholder="Description"></textarea>
                <label id="lbl-description"
                class="opacity-0 peer-focus-visible:opacity-100 peer-focus-visible:animate-fade py-1 text-sm absolute -top-7 left-1 peer-focus-visible:after:content-[attr(data-help)] peer-focus-visible:peer-invalid:after:animate-help peer-focus-visible:peer-valid:after:opacity-0 transition-all after:absolute after:left-0 after:top-0 after:whitespace-nowrap"
                  for="description">Description
                </label>
              </div>
              <div class="w-full relative mb-6">
                <input
                  class="w-full p-1 rounded bg-white border border-slate-400 mb-4 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                  name="due-date" id="due-date" type="date">
                <label id="lbl-due-date"
                  class="py-1 text-sm absolute bottom-12 left-1 transition-all"
                  for="due-date">Due date
                </label>
              </div>
              <div class="w-full relative mb-6">
                <select
                  class="w-full p-1 rounded bg-white border border-slate-400 mb-4 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                  name="priority" id="priority" required>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <label id="lbl-due-date" data-help="* This is a required field"
                class="py-1 text-sm absolute bottom-12 left-1 peer-focus-visible:after:content-[attr(data-help)] peer-focus-visible:peer-invalid:after:animate-help peer-focus-visible:peer-valid:after:opacity-0 transition-all after:absolute after:left-0 after:top-16 after:whitespace-nowrap"
                  for="priority">Priority *
                </label>
              </div>
            </form>
            <p id="author-modal" class="before:content-['By'] self-start before:not-italic pb-1 italic text-gray-800 dark:text-gray-200 hidden"></p>
            <div id="info-modal" class="h-[50vh] w-full pt-6 overflow-y-scroll text-gray-600 dark:text-gray-400 hidden"></div>
          </div>
          <div class="bg-slate-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button form="form-new-todo" id="btn-add" type="submit"
              class="inline-flex w-full justify-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 sm:ml-3 sm:w-auto">Add</button>
            <button id="btn-cancel" type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
          </div>
        </div>`;

  return dialogWithin;
}

function populateTodoViewSidebar() {
  const todoViewSidebarWithin = `<div class="bg-slate-100 px-4 py-3 flex justify-between sm:px-6">
                  <div class="flex items-center sm:justify-around sm:gap-1">
                    <div class="text-center sm:mt-0 sm:text-left">
                      <h3 class="font-semibold leading-6" id="sidebar-title"></h3>
                    </div>
                  </div>
                  <button type="button" id="btn-close-sidebar">
                  <i class="fa-regular fa-circle-xmark text-slate-400 text-xl"></i>
                  </button>
                </div>
                <div class="px-4 py-3">
                  <p id="sidebar-description" class="text-slate-500"></p>
                </div>`;

  return todoViewSidebarWithin;
}

export default function ProjectUI() {
  const container = document.createElement("div");
  container.classList.add(
    "p-8",
    "text-slate-700",
    "h-screen",
    "overflow-y-scroll"
  );

  const todoViewSidebar = document.createElement("div");
  todoViewSidebar.classList.add(
    "translate-x-full",
    "fixed",
    "right-0",
    "top-0",
    "z-[1000]",
    "border-2",
    "bg-white",
    "w-1/4",
    "h-screen",
    "overflow-auto",
    "p-0",
    "transition-all"
  );
  todoViewSidebar.setAttribute("id", "todo-sidebar");
  todoViewSidebar.innerHTML = populateTodoViewSidebar();
  container.appendChild(todoViewSidebar);

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("flex", "gap-2", "text-3xl", "font-bold");
  projectTitle.setAttribute("id", "project-title");
  container.appendChild(projectTitle);

  const projectDescription = document.createElement("p");
  projectDescription.classList.add(
    "text-sm",
    "mt-6",
    "pl-12",
    "text-slate-500"
  );
  projectDescription.setAttribute("id", "project-description");
  container.appendChild(projectDescription);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("flex", "items-center", "justify-center");

  const dialogNewTodo = document.createElement("dialog");
  dialogNewTodo.classList.add(
    "rounded-lg",
    "bg-white",
    "text-left",
    "shadow-xl",
    "sm:w-full",
    "sm:max-w-lg",
    "p-0",
    "backdrop:bg-slate-400/50",
    "backdrop:backdrop-blur-sm",
    "transition-all"
  );
  dialogNewTodo.setAttribute("id", "dialogNewTodo");
  dialogNewTodo.innerHTML = populateDialog();
  container.appendChild(dialogNewTodo);

  const btnNewTodo = document.createElement("button");
  btnNewTodo.innerText = "New Todo";
  btnNewTodo.classList.add(
    "px-8",
    "py-4",
    "font-bold",
    "bg-slate-200",
    "drop-shadow",
    "border",
    "rounded",
    "hover:drop-shadow-md",
    "hover:bg-slate-300",
    "transition-all"
  );
  btnNewTodo.setAttribute("id", "btn-new-todo");
  btnNewTodo.setAttribute("onClick", "dialogNewTodo.showModal()");
  btnContainer.appendChild(btnNewTodo);

  container.appendChild(btnContainer);

  const todosContainer = document.createElement("div");
  todosContainer.classList.add(
    "mt-12",
    "flex",
    "flex-col",
    "gap-2",
    "items-center",
    "justify-center"
  );
  todosContainer.setAttribute("id", "todos-container");
  container.appendChild(todosContainer);

  return container;
}
