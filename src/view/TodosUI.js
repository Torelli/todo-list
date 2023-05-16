export default function TodosUI(todos, todosContainer) {
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
      title.classList.add("text-lg", "font-bold");
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
