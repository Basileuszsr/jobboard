import React from 'react';
import { useNavigate } from 'react-router';

export default function Home(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/')
  }>Home</button>);
}
