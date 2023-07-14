function populatePriority(todo, priorityContainer) {
  priorityContainer.innerHTML = `<span id="priority-badge-${todo.id}">${todo.priority}</span>
                                <select
                                  class="hidden w-24 p-1 rounded bg-white border border-slate-400 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                                  name="priority-input-${todo.id}" id="priority-input-${todo.id}" required>
                                  <option value="High">High</option>
                                  <option value="Medium">Medium</option>
                                  <option value="Low">Low</option>
                                </select>`;
}
function stylizePriority(priority, priorityContainer) {
  if (priority === "High") {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-red-300",
      "text-red-800",
      "font-bold",
      "text-sm"
    );
    priorityContainer.children[1].value = "High";
  } else if (priority === "Medium") {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-yellow-300",
      "text-yellow-800",
      "font-bold",
      "text-sm"
    );
    priorityContainer.children[1].value = "Medium";
  } else {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-green-300",
      "text-green-800",
      "font-bold",
      "text-sm"
    );
    priorityContainer.children[1].value = "Low";
  }
}

function stylizeStatus(status) {
  if (status) {
    return `<button class="text-center w-12">
    <lord-icon
        src="https://cdn.lordicon.com/egiwmiit.json"
        trigger="click"
        colors="primary:#121331"
        state="morph-check-out">
    </lord-icon></i>
    </button>`;
  } else {
    return `<button class="text-center w-12">
    <lord-icon
      src="https://cdn.lordicon.com/egiwmiit.json"
      trigger="click"
      colors="primary:#121331"
      state="morph-check-in">
    </lord-icon></i>
    </button>`;
  }
}

function stylizeDescription(description, descriptionContainer) {
  if (description == "") descriptionContainer.classList.add("disabled:hidden");
}

function formatDueDate(dueDate) {
  if (isNaN(dueDate.getMonth())) {
    return "";
  }
  const month =
    dueDate.getMonth() < 10
      ? `0${dueDate.getMonth() + 1}`
      : dueDate.getMonth() + 1;
  const day =
    dueDate.getDate() < 10
      ? `0${dueDate.getDate() + 1}`
      : dueDate.getDate() + 1;
  const year = dueDate.getFullYear();

  const formattedDueDate = `${year}-${month}-${day}`;

  return formattedDueDate;
}

function createHeader() {
  const tableHeaders = document.createElement("div");
  tableHeaders.classList.add(
    "text-left",
    "grid",
    "grid-cols-4",
    "px-4",
    "py-2",
    "gap-2",
    "w-full",
    "font-bold",
    "border",
    "border-slate-300",
    "bg-slate-100",
    "rounded"
  );

  const title = document.createElement("p");
  title.innerText = "Title";
  tableHeaders.appendChild(title);

  const dueDate = document.createElement("p");
  dueDate.innerText = "Due date";
  tableHeaders.appendChild(dueDate);

  const priority = document.createElement("p");
  priority.innerText = "Priority";
  tableHeaders.appendChild(priority);

  const status = document.createElement("p");
  status.innerText = "Status";
  tableHeaders.appendChild(status);

  return tableHeaders;
}

export default function TodosUI(todos, todosContainer) {
  if (todos.length !== 0) {
    todosContainer.classList.add("w-full");
    todosContainer.innerText = "";

    todosContainer.appendChild(createHeader());
    let zIndex = 999;
    for (let todo of todos) {
      const tableRow = document.createElement("div");
      tableRow.setAttribute("id", `todo-row-${todo.id}`);
      tableRow.classList.add(
        "table-row",
        "text-left",
        "grid",
        "grid-cols-4",
        "px-4",
        "py-2",
        "gap-2",
        "w-full",
        "font-bold",
        "border",
        "border-slate-200",
        "rounded",
        "drop-shadow",
        "hover:drop-shadow-md",
        "hover:bg-slate-100/50",
        "transition-all"
      );
      tableRow.style.zIndex = zIndex;

      const titleDesc = document.createElement("div");
      titleDesc.classList.add("flex", "flex-col", "justify-center");

      const title = document.createElement("input");
      title.setAttribute("type", "text");
      title.setAttribute("id", `title-input-${todo.id}`);
      title.required = true;
      title.disabled = true;
      title.classList.add(
        "rounded",
        "border",
        "border-slate-400",
        "w-52",
        "pl-1",
        "text-lg",
        "font-bold",
        "disabled:border-0",
        "disabled:bg-transparent",
        "disabled:pl-0"
      );
      title.value = todo.title;
      titleDesc.appendChild(title);

      const description = document.createElement("textarea");
      description.setAttribute("id", `desc-input-${todo.id}`);
      description.classList.add(
        "w-52",
        "pl-1",
        "pb-2",
        "mt-2",
        "rounded",
        "border",
        "border-slate-400",
        "resize",
        "text-sm",
        "text-slate-500",
        "disabled:mt-0",
        "disabled:border-0",
        "disabled:w-full",
        "disabled:bg-transparent",
        "disabled:p-0",
        "disabled:h-5",
        "disabled:resize-none",
        "disabled:line-clamp-1"
      );
      description.disabled = true;
      description.value = todo.description;
      stylizeDescription(todo.description, description);
      titleDesc.appendChild(description);

      tableRow.appendChild(titleDesc);

      const dueDate = document.createElement("input");
      dueDate.setAttribute("id", `date-input-${todo.id}`);
      dueDate.setAttribute("type", "date");
      dueDate.disabled = true;
      dueDate.classList.add(
        "p-1",
        "h-8",
        "w-36",
        "rounded",
        "border",
        "border-slate-400",
        "self-center",
        "disabled:border-0",
        "disabled:p-0",
        "disabled:bg-transparent"
      );
      dueDate.value = formatDueDate(todo.dueDate);
      tableRow.appendChild(dueDate);

      const priority = document.createElement("div");
      populatePriority(todo, priority);
      stylizePriority(todo.priority, priority);
      priority.classList.add("flex", "items-center");
      tableRow.appendChild(priority);

      const status = document.createElement("div");
      status.classList.add("flex", "items-center", "gap-14");
      status.innerHTML = stylizeStatus(todo.isFinished);

      const optionsContainer = document.createElement("div");
      optionsContainer.classList.add("relative", "flex", "gap-2");
      optionsContainer.innerHTML = `<button id="btn-save-${todo.id}" class="hidden px-2 py-1 bg-white border border-slate-400 rounded hover:text-slate-900 hover:bg-slate-200 hover:drop-shadow transition-all"><i class="fa-regular fa-floppy-disk fa-xl"></i></button><button id="btn-cancel-${todo.id}" class="hidden px-2 py-1 bg-white border border-slate-400 rounded hover:text-slate-900 hover:bg-slate-200 hover:drop-shadow transition-all"><i class="fa-solid fa-xmark fa-xl"></i></button><button id="btn-options-${todo.id}" onclick="optionsDialog${todo.id}.show()" class="optionsButton px-4 font-bold text-slate-500 hover:text-slate-900 transition-all"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;

      const optionsDialog = document.createElement("dialog");
      optionsDialog.setAttribute("id", `optionsDialog${todo.id}`);
      optionsDialog.classList.add(
        "context",
        "hidden",
        "open:block",
        "absolute",
        "top-4",
        "left-6",
        "p-0"
      );
      optionsDialog.innerHTML = `<div data-id="${todo.id}" class="bg-white flex flex-col"><button class="context-view px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-eye text-slate-600"></i>View</button><button class="context-edit px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-pen-to-square text-slate-600"></i>Edit</button><button class="context-delete px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-trash-can text-slate-600"></i>Delete</button></div>`;
      optionsContainer.appendChild(optionsDialog);

      status.appendChild(optionsContainer);

      tableRow.appendChild(status);

      todosContainer.appendChild(tableRow);

      zIndex--;
    }
  } else {
    todosContainer.innerText = "No to-dos yet!";
  }
}
