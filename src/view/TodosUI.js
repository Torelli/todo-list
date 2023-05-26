function stylizePriority(priority, priorityContainer) {
  if (priority === "High") {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-red-300",
      "text-red-800"
    );
  } else if (priority === "Medium") {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-yellow-300",
      "text-yellow-800"
    );
  } else {
    priorityContainer.children[0].classList.add(
      "rounded-full",
      "px-2",
      "py-1",
      "bg-green-300",
      "text-green-800"
    );
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
  const container = document.createElement("thead");

  const tableHeaders = document.createElement("tr");
  tableHeaders.classList.add("text-left");

  const title = document.createElement("th");
  title.innerText = "Todo";
  title.classList.add("w-[60ch]");
  tableHeaders.appendChild(title);

  const dueDate = document.createElement("th");
  dueDate.innerText = "Due date";
  tableHeaders.appendChild(dueDate);

  const priority = document.createElement("th");
  priority.innerText = "Priority";
  tableHeaders.appendChild(priority);

  const status = document.createElement("th");
  status.innerText = "Status";
  tableHeaders.appendChild(status);

  const options = document.createElement("th");
  options.innerText = "Options";
  tableHeaders.appendChild(options);

  container.appendChild(tableHeaders);

  return container;
}

export default function TodosUI(todos, todosContainer) {
  if (todos.length !== 0) {
    todosContainer.classList.remove(
      "flex",
      "flex-col",
      "gap-1",
      "items-center",
      "justify-center"
    );
    todosContainer.classList.add("table-fixed", "w-full");
    todosContainer.innerText = "";

    todosContainer.appendChild(createHeader());

    const tableBody = document.createElement("tbody");

    for (let todo of todos) {
      const tableRow = document.createElement("tr");
      tableRow.classList.add("border-y", "border-y-slate-300");

      const titleDesc = document.createElement("td");

      const title = document.createElement("p");
      title.classList.add("text-lg", "font-bold");
      title.innerText = todo.title;
      titleDesc.appendChild(title);

      const description = document.createElement("p");
      description.classList.add("text-sm", "text-slate-500");
      description.innerText = todo.description;
      titleDesc.appendChild(description);

      tableRow.appendChild(titleDesc);

      const dueDate = document.createElement("td");
      dueDate.innerText = formatDueDate(todo.dueDate);
      tableRow.appendChild(dueDate);

      const priority = document.createElement("td");
      priority.innerHTML = `<span>${todo.priority}</span>`;
      stylizePriority(todo.priority, priority);
      tableRow.appendChild(priority);

      const status = document.createElement("td");
      status.innerText = todo.isFinished;
      tableRow.appendChild(status);

      const optionsContainer = document.createElement("td");
      optionsContainer.innerHTML = `<button class="px-4 py-2 font-bold border rounded hover:bg-slate-300 transition-all"><i class="fa-solid fa-pen-to-square"></i></button><button class="px-4 py-2 font-bold border rounded hover:bg-slate-300 transition-all"><i class="fa-solid fa-trash-can"></i></button>`;
      tableRow.appendChild(optionsContainer);

      tableBody.appendChild(tableRow);

      todosContainer.appendChild(tableBody);
    }
  } else {
    todosContainer.innerText = "No to-dos yet!";
  }
}
