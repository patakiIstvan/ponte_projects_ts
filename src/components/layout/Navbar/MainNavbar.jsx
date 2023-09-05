import React, { forwardRef, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const MainNavbar = forwardRef(function MainNavbar(props, ref) {

  useEffect(() => {
    alert("Sajnos nem sikerült hétfőre befejezni a beadandó projektetm azonban az >>absztrakt<< wizard form kész van és van benne validáció. A hét folyamán igyekszem befejezni a projektet.")
  }, [])

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
            <Button onClick={(e) => { props.handleClick(e, ref) }} variant="outline-primary">Keresés</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
});

export default MainNavbar