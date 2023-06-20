export default function ProjectUI() {
  const container = document.createElement("div");
  container.classList.add("p-8", "text-slate-700");

  const projectTitle = document.createElement("h2");
  projectTitle.classList.add("text-3xl", "font-bold");
  projectTitle.setAttribute("id", "project-title");
  container.appendChild(projectTitle);

  const projectDescription = document.createElement("p");
  projectDescription.classList.add("text-sm", "mt-6", "pl-4", "text-slate-500");
  projectDescription.setAttribute("id", "project-description");
  container.appendChild(projectDescription);

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("flex", "items-center", "justify-center");

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
