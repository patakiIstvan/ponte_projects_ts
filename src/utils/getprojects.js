export const getProjects = async function(){
  let projects = localStorage.getItem("projects");
  if (!projects){
    setLocalStorage()
    return getProjects();
  } else {
    projects = JSON.parse(projects);
  }
  await new Promise(resolve => setTimeout(resolve, 0));
  return projects;
}

function setLocalStorage(data = null){
  localStorage.setItem("projects", JSON.stringify(data ? data : initialProjects));
}

const initialProjects = [
  {
    title: "Project1",
    description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    members: 
    [
      {
        name: "Pataki István",
        position: ["programmer, candidate"]
      }
    ],
    links: ["facebook.com", "google.com"]
  },
  {
    title: "Project1",
    description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    members: 
    [
      {
        name: "Pataki István",
        position: ["programmer, candidate"]
      }
    ],
    links: ["facebook.com", "google.com"]

  },
  {
    title: "Project1",
    description: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    members: 
    [
      {
        name: "Pataki István",
        position: ["programmer, candidate"]
      }
    ],
    links: ["facebook.com", "google.com"]

  }
]
