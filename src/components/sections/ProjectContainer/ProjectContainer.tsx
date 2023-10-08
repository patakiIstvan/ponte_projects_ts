import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import './projectContainer.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProjectCard from '../../reuseables/ProjectCard/ProjectCard';
import { getProjects } from '../../../utils/getprojects';
import Spinner from 'react-bootstrap/Spinner';
import FormModal from '../../widgets/FormModal/FormModal';
import InputContainer1, { inputValidate1 } from '../../form/formPages/InputContainer1';
import InputContainer3, { inputValidate3 } from '../../form/formPages/InputContainer3';
import InputContainer2 from '../../form/formPages/InputContainer2';
import Button from 'react-bootstrap/Button';

interface ProjectContainerProps {
  search: string;
}

type projectType = { [key: string]: any }

const ProjectContainer: React.FC<ProjectContainerProps> = (props) => {

  const [projectData, setProjectData] = useState<projectType | null>(null);
  const getProjectCards = async () => {
    let projects = await getProjects();
    if (props.search) {
      projects = Object.values(projects).filter((project: Record<string, any>) => project.title.toLowerCase().includes(props.search.toLowerCase()))
    }
    setProjectData(projects);
  }

  useEffect(() => {
    getProjectCards()
  }, [props.search])

  const onModalSubmit = function (data: Record<string, any>) {
    let projects: string | null = localStorage.getItem("projects");
    if (projects) {
      const projectObject: { [key: number]: any } = JSON.parse(projects);
      const index = Object.keys(projectObject).length !== 0 ? Math.max(...Object.keys(projectObject).map(Number)) + 1 : 0
      projectObject[index] = data;
      localStorage.setItem("projects", JSON.stringify(projectObject));
      getProjectCards();
    }
  }

  const deleteProject = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (projectData) {
      const target = e.target as HTMLButtonElement;
      const projectId = target.getAttribute("data-projectid");
      const newProjectData = Object.assign({}, ...Object.keys(projectData)
        .filter(key => key !== projectId)
        .map(key => ({ [key]: projectData[key] })));
      localStorage.setItem("projects", JSON.stringify(newProjectData));
      getProjectCards();
    }
  }

  if (!projectData) {
    return (
      <section className="projectSection center">
        <Spinner animation="border" variant="primary" />
      </section>
    )
  }

  return (
    <section className={Object.keys(projectData).length > 0 ? "projectSection" : "projectSection flex-center"}>
      <Container>
        {Object.keys(projectData).length > 0 ?
          <Row sm={1} md={2} xl={3} className="g-4">
            {Object.entries(projectData as projectType).map(([idx, project]) => (
              <Col key={idx}>
                <ProjectCard
                  {...project}
                  projectId={idx}
                  deleteProject={deleteProject}
                />
              </Col>
            ))}
          </Row> : <div className="empty-project-container">
            <span>This emptiness drives me crazy</span>
            <Button onClick={() => { localStorage.removeItem("projects"); getProjectCards(); }} variant="outline-danger">Revert to initial state</Button>

          </div>}
        <FormModal
          onModalSubmit={onModalSubmit}
          pages={[
            { inputs: <InputContainer1 />, "validation": inputValidate1, title: "Projekt leírások" },
            { inputs: <InputContainer3 />, "validation": inputValidate3, title: "Résztvevők hozzáadása" },
            { inputs: <InputContainer2 />, title: "Projekt linkek" }

          ]}
        />
      </Container>
    </section>
  )
}

export default ProjectContainer