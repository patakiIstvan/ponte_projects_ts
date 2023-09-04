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
    title: "Beadandó feladat átnézése",
    description: "Senior front-endes kolléga bevonása a beadandó feladat átnézésére.",
    members: 
    [
      {
        name: "Tóth Miska",
        role: ["Sr. front-end"]
      },
      {
        name: "Veperdi Dóra",
        role: ["Team leader"]
      }
    ],
    links: [
      {url: "https://github.com/patakiIstvan/ts_projects_dashboard", icon: "github"},
      {url: "https://patakiistvan.netlify.app/", icon: ""}
    ]
  },
  {
    title: "Pataki István felvétele",
    description: "Az interjúk után megbizonyosodva a jelölt szakértelméről, Pataki István felvétele a csapatba.",
    members: 
    [
      {
        name: "Gál Judit",
        role: ["HR"]
      },
      {
        name: "Balázs Bertalan",
        role: ["CEO"]
      },
      {
        name: "Tóth Miska",
        role: ["Sr. front-end"]
      }
    ],
    links: [
      {url: "https://www.facebook.com/istvan.pataki.39/", icon: "facebook"},
      {url: "https://patakiistvan.netlify.app/", icon: ""}
    ]

  },
  {
    title: "Integráció",
    description: "Kódbázis bemutatása Pataki Istvánnak, amelynek mélyebb tanulmányozásával hatékonyan tud dolgozni.",
    members: 
    [
      {
        name: "Pataki István",
        role: ["Front-end"]
      },
      {
        name: "Tóth Miska",
        role: ["Sr. front-end"]
      },
      {
        name: "Veperdi Dóra",
        role: ["Team leader"]
      },
      {
        name: "Kiss Sára",
        role: ["UI/UX designer"]
      }
    ],
    links: [
      {url: "https://patakiistvan.netlify.app/", icon: ""}
    ]
  }
]
