import React from 'react';
import axios, { Axios } from 'axios';
import * as ReactBootStrap from "react-bootstrap";
import { Row } from "react-bootstrap";
import Logout from './Logout';

export default function Navbar(props) {
  if (props.name) {
    return (
      <Row>
        <ReactBootStrap.Navbar bg="light" expand="lg">
          <ReactBootStrap.Navbar.Brand href="/">
            <img
              alt=""
              src="https://www.kindpng.com/picc/m/133-1337806_job-vector-seeker-job-logo-magnifying-glass-png.png"
              width="90"
              height="70"
            />{' '}
          </ReactBootStrap.Navbar.Brand>
          <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
          <ReactBootStrap.Nav.Item>{"Welcome, " + props.name}</ReactBootStrap.Nav.Item>
          <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
          <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
            <ReactBootStrap.Nav className="me-auto">
              <Logout setLoginName={props.setLoginName} />
            </ReactBootStrap.Nav>
          </ReactBootStrap.Navbar.Collapse>
        </ReactBootStrap.Navbar>
      </Row>
    )
  }

  return (
    <Row>
      <ReactBootStrap.Navbar bg="light" expand="lg">
        <ReactBootStrap.Navbar.Brand href="/">
          <img
            alt=""
            src="https://www.kindpng.com/picc/m/133-1337806_job-vector-seeker-job-logo-magnifying-glass-png.png"
            width="90"
            height="70"
          />{' '}
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Nav.Link href="/">Home</ReactBootStrap.Nav.Link>
        <ReactBootStrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="basic-navbar-nav">
          <ReactBootStrap.Nav className="me-auto">
            <ReactBootStrap.Nav.Link href="/login">Log In</ReactBootStrap.Nav.Link>
            <ReactBootStrap.Nav.Link href="/signup">Sign Up</ReactBootStrap.Nav.Link>
          </ReactBootStrap.Nav>
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </Row>
  )
}
