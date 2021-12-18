import React from 'react';
import { useNavigate } from 'react-router';

export default function Navbar(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/')
  }>Home</button>);
}
