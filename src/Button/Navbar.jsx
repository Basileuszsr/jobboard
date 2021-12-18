import React from 'react';
import axios, { Axios } from 'axios';
import * as ReactBootStrap from "react-bootstrap";
import Home from './Home';
import { Row } from "react-bootstrap";

export default function Navbar(props) {
  if (props.name) {
    return (
      <Row>
        <ReactBootStrap.Navbar bg="light" expand="lg">
          <Home />
          <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="me-auto">
              <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/login">Log In</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/signup">Sign Up</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/">{props.name}</ReactBootStrap.Nav.Link>
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
      </Row>
    )
  }

  return (
    <Row>
      <ReactBootStrap.Navbar bg="light" expand="lg">
        <Home />
        <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootStrap.Nav className="me-auto">
            <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link
              href="/login"
              onClick={
                () => {
                  axios.post('/api/users/logout')
                    .then(() => props.setLoginName(null))
                    .catch(console.error)
                }
              }>Logout</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/">{props.name}</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </Row>)
}
