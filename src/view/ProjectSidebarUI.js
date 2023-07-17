export default function ProjectSidebarUI() {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "justify-between",
    "items-center",
    "h-screen",
    "bg-sky-600",
    "text-white",
    "font-bold",
    "whitespace-nowrap",
    "overflow-hidden"
  );

  const pinnedButtonsContainer = document.createElement("div");
  pinnedButtonsContainer.classList.add(
    "w-full",
    "flex",
    "flex-col",
    "items-center",
    "text-lg"
  );

  const btnCollapseSidebar = document.createElement("button");
  btnCollapseSidebar.setAttribute("id", "btn-collapse-sidebar");
  btnCollapseSidebar.classList.add(
    "w-full",
    "py-2",
    "px-4",
    "text-center",
    "hover:bg-slate-800/25",
    "transition-all"
  );
  btnCollapseSidebar.innerHTML = `<i class="fa-solid fa-circle-chevron-right transition-all fa-lg"></i>`;
  pinnedButtonsContainer.appendChild(btnCollapseSidebar);

  const pinnedProjectsContainer = document.createElement("div");
  pinnedProjectsContainer.setAttribute("id", "pinned-projects-container");
  pinnedProjectsContainer.classList.add("w-full");

  pinnedButtonsContainer.appendChild(pinnedProjectsContainer);
  container.appendChild(pinnedButtonsContainer);

  const createProjectContainer = document.createElement("div");
  createProjectContainer.setAttribute("id", "create-project-container");
  createProjectContainer.classList.add(
    "w-full",
    "flex",
    "items-center",
    "hover:bg-slate-800/25",
    "text-lg",
    "cursor-pointer"
  );
  createProjectContainer.innerHTML = `<button class="h-full py-2 px-4" id="btn-toggle-input"><i class="fa-solid fa-circle-plus fa-lg"></i></button><label id="lbl-create-project" class="opacity-0 cursor-pointer w-full py-2">Create project</label><input id="input-create-project" type="text" placeholder="Project title" class="hidden w-9/12 text-slate-700 pl-1 transition-all disabled:cursor-pointer rounded bg-white border border-slate-400 focus-visible:outline-0 focus-visible:border-slate-700" disabled /> <button class="hidden py-2 px-4" id="btn-add-project"><i class="fa-solid fa-check"></i></button>`;
  container.appendChild(createProjectContainer);

  const unpinnedProjectsContainer = document.createElement("div");
  unpinnedProjectsContainer.setAttribute("id", "unpinned-projects-container");
  container.appendChild(unpinnedProjectsContainer);

  return container;
}
