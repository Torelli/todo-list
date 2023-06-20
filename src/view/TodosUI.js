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
  }
}

function stylizeStatus(status) {
  if (status) {
    return `<div class="text-center w-12"><i class="fa-regular fa-circle-check text-3xl"></i></div>`;
  } else {
    return`<div class="text-center w-12"><i class="fa-regular fa-circle text-3xl"></i></div>`;
  }
}

function formatDueDate(dueDate) {
  const month =
    dueDate.getMonth() < 10
      ? `0${dueDate.getMonth() + 1}`
      : dueDate.getMonth() + 1;
  const day =
    dueDate.getDate() < 10 ? `0${dueDate.getDate()}` : dueDate.getDate();
  const year = dueDate.getFullYear();

  const formattedDueDate = `${month}/${day}/${year}`;

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

    for (let todo of todos) {
      const tableRow = document.createElement("div");
      tableRow.classList.add(
        "group", 
        "cursor-pointer",
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
        "hover:scale-[1.02]",
        "transition-all"
      );

      const titleDesc = document.createElement("div");

      const title = document.createElement("p");
      title.classList.add("text-lg", "font-bold");
      title.innerText = todo.title;
      titleDesc.appendChild(title);

      const description = document.createElement("p");
      description.classList.add("text-sm", "text-slate-500");
      description.innerText = todo.description;
      titleDesc.appendChild(description);

      tableRow.appendChild(titleDesc);

      const dueDate = document.createElement("div");
      dueDate.classList.add("flex", "items-center");
      dueDate.innerText = formatDueDate(todo.dueDate);
      tableRow.appendChild(dueDate);

      const priority = document.createElement("div");
      priority.innerHTML = `<span>${todo.priority}</span>`;
      stylizePriority(todo.priority, priority);
      priority.classList.add("flex", "items-center");
      tableRow.appendChild(priority);

      const status = document.createElement("div");
      status.classList.add("flex", "items-center", "gap-14");
      status.innerHTML = stylizeStatus(todo.isFinished);

      const optionsContainer = document.createElement("div");
      optionsContainer.innerHTML = `<button class="px-4 font-bold text-slate-500 hover:text-slate-900 transition-all"><i class="fa-solid fa-ellipsis-vertical"></i></button>`;
      status.appendChild(optionsContainer);

      tableRow.appendChild(status);

      todosContainer.appendChild(tableRow);
    }
  } else {
    todosContainer.innerText = "No to-dos yet!";
  }
}
