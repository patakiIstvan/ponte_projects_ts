import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const MainNavbar = () => {
  return (
    <Navbar data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>Ponte Projektek</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default MainNavbar