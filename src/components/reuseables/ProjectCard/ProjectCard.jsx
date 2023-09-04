import React from 'react'
import Card from 'react-bootstrap/Card';
import './projectCard.scss';

const ProjectCard = (props) => {

  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard