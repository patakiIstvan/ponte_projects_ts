import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MainNavbar = () => {
  return (
    <Navbar data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Ponte Projektek</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Projekt cím"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Keresés</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MainNavbar