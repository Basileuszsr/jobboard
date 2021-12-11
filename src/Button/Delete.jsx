import React from 'react';
import { useNavigate } from 'react-router';

export default function Delete(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/')
  }>Delete</button>);
}
