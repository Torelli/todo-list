export default function ProjectSidebarUI() {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
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
    "h-[30%]",
    "overflow-y-auto",
    "overflow-x-hidden",
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
    "min-h-[30%]",
    "flex",
    "flex-col",
    "items-start",
    "text-lg"
  );
  createProjectContainer.innerHTML = `<button class="w-full py-2 px-[0.9rem] flex gap-4 items-center hover:bg-slate-800/25" id="btn-toggle-input"><i class="fa-solid fa-circle-plus fa-lg"></i><span class="transition-all">Create project</span></button><form id="form-create-project" class="w-full max-h-0 mt-2 overflow-hidden p-0 flex flex-col gap-2 transition-all" action=""><input id="input-project-title" name="input-project-title" type="text" placeholder="Project title*" class="w-full text-slate-700 pl-1 transition-all rounded bg-white border border-slate-400 focus-visible:outline-0 focus-visible:border-slate-700" disabled required /><textarea id="input-project-description" class="pl-1 pb-2 rounded border border-slate-400 resize-none text-slate-700 focus-visible:outline-0 focus-visible:border-slate-700" placeholder="Description" disabled></textarea><label for="input-project-due-date">Due date</label><input id="input-project-due-date" name="input-project-due-date" type="date" class="p-1 w-full text-slate-700 rounded border border-slate-400 focus-visible:outline-0 focus-visible:border-slate-700" disabled/><button type="submit" class="py-2 px-4" id="btn-add-project" disabled><i class="fa-solid fa-check"></i></button></form>`;
  container.appendChild(createProjectContainer);

  const unpinnedProjectsContainer = document.createElement("div");
  unpinnedProjectsContainer.setAttribute("id", "unpinned-projects-container");
  unpinnedProjectsContainer.classList.add("w-full", "h-[30%]", "transition-all");
  container.appendChild(unpinnedProjectsContainer);

  return container;
}
