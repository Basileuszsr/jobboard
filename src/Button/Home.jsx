import React from 'react';
import * as ReactBootStrap from "react-bootstrap";

export default function Home() {
  return (
    <>
      <ReactBootStrap.Navbar bg="light" expand="lg">
        <ReactBootStrap.Navbar.Brand href="/">
          <img
            src="https://www.kindpng.com/picc/m/133-1337806_job-vector-seeker-job-logo-magnifying-glass-png.png"
            width="90"
            height="70"
          />{' '}
        </ReactBootStrap.Navbar.Brand>
      </ReactBootStrap.Navbar>
    </>
  )
}
