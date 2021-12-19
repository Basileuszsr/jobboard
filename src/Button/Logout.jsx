import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Logout(props) {
  const navigate = useNavigate();
  return <ReactBootStrap.Nav.Link
    onClick={
      e => {
        e.preventDefault();
        axios.post('/api/users/logout')
          .then(() => props.setLoginName(null))
          .then(() => {
            navigate("/")
          })
          .catch(console.error)
      }
    }>Logout
  </ReactBootStrap.Nav.Link>
}
