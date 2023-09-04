import React, { forwardRef } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MainNavbar = forwardRef(function MainNavbar(props, ref) {
  return (
    <Navbar data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Ponte Projektek</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Form.Control
              ref={ref}
              type="search"
              placeholder="Projekt cím"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={(e) => { props.handleClick(e, ref) }} variant="outline-primary">Keresés</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
});

export default MainNavbar