import { initialProjects } from "./dummydata";

type ProjectType = () => Record<string, any>

export const getProjects: ProjectType = async function () {
  let projects = localStorage.getItem("projects");
  if (!projects) {
    setLocalStorage()
    return getProjects();
  } else {
    projects = JSON.parse(projects);
  }
  await new Promise<void>(resolve => setTimeout(resolve, 0));
  return projects;
}

function setLocalStorage(data = null) {
  localStorage.setItem("projects", JSON.stringify(data ? data : initialProjects));
}