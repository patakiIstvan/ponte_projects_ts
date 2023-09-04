import React from 'react'
import Card from 'react-bootstrap/Card';
import './projectCard.scss';

const ProjectCard = (props) => {

  const titleUrl = props.title.replace(" ", "-")

  return (
    <Card>
      <Card.Body>
        <div className="card-title-container">
        <img className="lettered-avatar" src={"https://avatar.oxro.io/avatar.svg?name=" + titleUrl} />
        <Card.Title>{props.title}</Card.Title>
        </div>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard