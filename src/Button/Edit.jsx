import React from 'react';
import { useNavigate } from 'react-router';

export default function Edit(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/')
  }>Edit</button>);
}
