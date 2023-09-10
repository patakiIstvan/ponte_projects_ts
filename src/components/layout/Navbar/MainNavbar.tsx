import React, { forwardRef } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface MainNavbarProps {
  handleClick: ( ref: React.ForwardedRef<HTMLInputElement>) => void;
}


const MainNavbar = forwardRef<HTMLInputElement, MainNavbarProps>(function MainNavbar(props, ref) {
  return (
    <Navbar data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Type-safe projektek</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form className="d-flex">
            <Form.Control
              ref={ref}
              type="search"
              placeholder="Projekt cím"
              className="me-2"
              aria-label="Search"
            />
            <Button onClick={() => props.handleClick(ref)} variant="outline-primary">Keresés</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
});

export default MainNavbar