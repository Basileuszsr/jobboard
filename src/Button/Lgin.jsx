import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';


export default function Lgin(props) {
    const navigate = useNavigate();
    return (<button onClick={
        () => navigate('/login')
  }>Log In</button>);
}
