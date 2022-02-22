import * as React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

const SiteNavigation = () => {
  return (
    <Navbar expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">KI4HDU</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/tags">Notes</Nav.Link>
            <Nav.Link href="/maps">Maps</Nav.Link>
            <Nav.Link href="/photos">Photos</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default SiteNavigation
