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
import InputContainer2 from '../../form/formPages/InputContainer2';


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

  const onModalSubmit = function (data) {
    let projects = localStorage.getItem("projects");
    projects = JSON.parse(projects);
    projects.push(data)
    localStorage.setItem("projects", JSON.stringify(projects));
    getProjectCards();
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
      <div className="msg">Sajnos nem sikerült teljesen befejeznem a beadandót, még hátra van egy input mező megírása, illetve a változók typeosítása. Ezeket tervezem a közeljövőben megírni, mindenesetre remélem elég reprezentatív képet ad a tudásomról az eddig megírt kód.</div>
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
          onModalSubmit={onModalSubmit}
          pages={[
            { inputs: <InputContainer1 />, "validation": inputValidate1, title: "Projekt leírások" },
            { inputs: <InputContainer2 />, title: "Projekt linkek" },
            { inputs: <></> }]}
        />
      </Container>
    </section>
  )
}

export default ProjectContainer