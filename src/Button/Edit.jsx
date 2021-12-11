import React from 'react';
import { useNavigate } from 'react-router';


//TODO: edit button
export default function Edit(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/')
  }>Edit</button>);
}
