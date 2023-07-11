function populatePriority(todo, priorityContainer) {
  priorityContainer.innerHTML = `<span>${todo.priority}</span>
                                <select
                                  class="hidden w-24 p-1 rounded bg-white border border-slate-400 focus-visible:outline-0 focus-visible:border-slate-700 focus-visible:placeholder:invisible peer"
                                  name="updatePriorityTodo${todo.id}" id="updatePriorityTodo${todo.id}" required>
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
      title.disabled = true;
      title.classList.add(
        "pl-1",
        "text-lg",
        "font-bold",
        "disabled:bg-transparent",
        "disabled:pl-0"
      );
      title.value = todo.title;
      titleDesc.appendChild(title);

      const description = document.createElement("textarea");
      description.classList.add(
        "pl-1",
        "pb-2",
        "text-sm",
        "text-slate-500",
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
      dueDate.setAttribute("type", "date");
      dueDate.disabled = true;
      dueDate.classList.add("w-32", "disabled:bg-transparent");
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
      optionsContainer.classList.add("relative");
      optionsContainer.innerHTML = `<button onclick="optionsDialog${todo.id}.show()" class="optionsButton px-4 font-bold text-slate-500 hover:text-slate-900 transition-all"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;

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
      optionsDialog.innerHTML = `<div class="bg-white flex flex-col"><button data-id="${todo.id}" class="context-view px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-eye text-slate-600"></i>View</button><button class="px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-pen-to-square text-slate-600"></i>Edit</button><button class="px-4 py-1 text-sm font-normal hover:bg-slate-300 flex gap-1 items-center"><i class="fa-regular fa-trash-can text-slate-600"></i>Delete</button></div>`;
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
