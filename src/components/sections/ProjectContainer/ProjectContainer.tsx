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

interface ProjectContainerProps {
  search: string;
}

const ProjectContainer: React.FC<ProjectContainerProps> = (props) => {

  const [projectData, setProjectData] = useState<any>(null);
  const getProjectCards = async () => {
    let projects = await getProjects();
    if (props.search) {
      projects = projects.filter((project: Record<string, any>) => project.title.toLowerCase().includes(props.search.toLowerCase()))
    }
    setProjectData(projects);
  }

  useEffect(() => {
    getProjectCards()
  }, [props.search])

  const onModalSubmit = function (data: Record<string, any>) {
    let projects: string | null = localStorage.getItem("projects");
    if (projects) {
      const projectArray: any[] = JSON.parse(projects);
      projectArray.push(data)
      localStorage.setItem("projects", JSON.stringify(projectArray));
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
    <section className="projectSection">
      <Container>

        <Row xs={1} md={3} className="g-4">
          {projectData.map((project: Record<string, any>, idx: number) => (
            <Col key={idx}>
              <ProjectCard
                {...project}
              />
            </Col>
          ))}
        </Row>
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