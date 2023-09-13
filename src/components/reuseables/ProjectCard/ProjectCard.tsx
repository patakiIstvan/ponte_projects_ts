import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './projectCard.scss';

interface Member {
  name: string;
  role: string[];
}

interface ProjectCardProps {
  title: string;
  description?: string;
  members?: Member[];
  links?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = (props) => {

  const titleUrl = props.title.replace(" ", "-")

  return (
    <Card>
      <Card.Body>
        <div className="card-title-container">
          <img className="lettered-avatar" src={"https://avatar.oxro.io/avatar.svg?name=" + titleUrl} alt="link icon" />
          <Card.Title>{props.title}</Card.Title>
        </div>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <ListGroup variant="flush">

        {props.members && props.members.map((member, idx) => (
          <ListGroup.Item key={"member_" + idx}>{member.name} - {member.role.join(', ')}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <div className="link-container">
          {props?.links && props.links.map((link, idx) => (
            <a href={link} target="_blank" key={"icon_" + idx}><img className="link-icon" src={`https://www.google.com/s2/favicons?domain=${link}&sz=256`} /></a>
          ))
          }
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProjectCard;