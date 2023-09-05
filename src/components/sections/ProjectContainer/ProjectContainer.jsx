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

const ProjectContainer = (props) => {

  const [projectData, setProjectData] = useState(null);

  const getProjectCards = async () => {
    let projects = await getProjects();
    if (props.search) {
      console.log(props.search)
      projects = projects.filter(project => project.title.toLowerCase().includes(props.search.toLowerCase()))
    }
    setProjectData(projects);
  }

  useEffect(() => {
    getProjectCards()
  }, [props.search])

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
          {projectData.map((project, idx) => (
            <Col key={idx}>
              <ProjectCard
                {...project}
              />
            </Col>
          ))}
        </Row>
        <FormModal
          getProjectCards={getProjectCards}
          pages={[{ inputs: <InputContainer1 />, "valiadtion": inputValidate1 }, { inputs: <></>, valiadtion: null }, { inputs: <></>, valiadtion: null }]}
        />
      </Container>
    </section>
  )
}

export default ProjectContainer