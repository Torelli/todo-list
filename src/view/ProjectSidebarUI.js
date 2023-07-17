export default function ProjectSidebarUI() {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "py-2",
    "px-4",
    "h-screen",
    "bg-sky-600",
    "text-white"
  );

  const btnCollapseSidebar = document.createElement("button");
  btnCollapseSidebar.setAttribute("id", "btn-collapse-sidebar");
  btnCollapseSidebar.classList.add("w-full", "text-center");
  btnCollapseSidebar.innerHTML = `<i class="fa-solid fa-circle-chevron-right transition-all fa-lg"></i>`;

  container.appendChild(btnCollapseSidebar);

  return container;
}
