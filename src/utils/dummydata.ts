export const dummy_roles = ["Project manager", "Sr. front-end", "Front-end", "Sr. Back-end", "Back-end", "Team leader", "HR", "CEO", "Scrum master", "Marketing", "Web developer", "Sr. web developer"]

export const initialProjects = {
  0: {
    title: "Review of the assigned tasks",
    description: "Review the tasks of the applicants with senior web developers.",
    members:
      [
        {
          name: "Miska Tóth",
          role: ["Sr. web developer"]
        },
        {
          name: "Dóra Veperdi",
          role: ["Team leader"]
        }
      ],
    links: ["https://github.com/patakiIstvan/ts_projects_dashboard", "https://patakiistvan.netlify.app/"]
  },
  1: {
    title: "Hiring István Pataki for the job",
    description: "Having been convinced of the candidate's expertise after the interviews, hire István Pataki into the team.",
    members:
      [
        {
          name: "Judit Gál",
          role: ["HR"]
        },
        {
          name: "Bertalan Balázs",
          role: ["CEO"]
        },
        {
          name: "Miska Tóth",
          role: ["Sr. web developer"]
        }
      ],
    links: ["https://www.facebook.com/istvan.pataki.39/", "https://patakiistvan.netlify.app/"]
  },
  2: {
    title: "Integration into the team",
    description: "Presenting the codebase to István Pataki, allowing him to work efficiently after its deeper examination.",
    members:
      [
        {
          name: "István Pataki",
          role: ["Web developer"]
        },
        {
          name: "Miska Tóth",
          role: ["Sr. front-end"]
        },
        {
          name: "Dóra Veperdi",
          role: ["Team leader"]
        },
        {
          name: "Sára Kiss",
          role: ["UI/UX designer"]
        }
      ],
    links: ["https://patakiistvan.netlify.app/"]
  }
}
