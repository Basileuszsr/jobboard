import React from 'react';
import axios, { Axios } from 'axios';
import Profile from './Profile';

export default function NavbarAdmin(props) {
  return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <Profile />
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" onClick={() => axios.post('/api/users/logout')
            .then(() => props.setLoginName(null))
            .catch(console.error)}>Logout</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" >{props.name}</a>
        </li>
      </ul>
    </div>
  </nav>
  );
}
