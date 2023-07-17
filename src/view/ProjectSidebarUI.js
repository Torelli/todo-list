export default function ProjectSidebarUI(projects) {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "h-screen",
    "bg-sky-600",
    "text-white",
    "font-bold"
  );

  const pinnedButtonsContainer = document.createElement("div");
  pinnedButtonsContainer.classList.add(
    "w-full",
    "flex",
    "flex-col",
    "items-center"
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
  for (let project of projects) {
    const btnProject = document.createElement("button");
    btnProject.classList.add(
      "w-full",
      "py-2",
      "px-4",
      "flex",
      "gap-20",
      "items-center",
      "hover:bg-slate-800/25"
    );
    btnProject.innerHTML = `<i class="fa-solid ${project.icon}"></i><span class="opacity-0 transition-all">${project.title}</span>`;
    pinnedProjectsContainer.appendChild(btnProject);
  }
  pinnedButtonsContainer.appendChild(pinnedProjectsContainer);
  container.appendChild(pinnedButtonsContainer);

  return container;
}
