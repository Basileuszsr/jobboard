import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Edit(props) {
  const navigate = useNavigate();
  const name = props.val;
  return (<button onClick={() => {
    navigate('/update/' + name);
  }
  }>Edit</button>);
}
