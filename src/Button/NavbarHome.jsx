import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { Row } from "react-bootstrap";
import Home from './Home';


export default function NavbarHome() {
  return (
    <Row>
      <ReactBootStrap.Navbar bg="light" expand="lg">
        <Home />
        <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="me-auto">
              <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </Row>
  )
}
