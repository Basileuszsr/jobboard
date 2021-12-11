import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Delete(props) {
    const navigate = useNavigate();
    const name = props.val;
    return (<button onClick={() => {
      axios.delete('http://localhost:8000/api/job/delete/' + name)
            .catch(error => console.log("Could not find Job"));
      navigate('/');
    }
  }>Delete</button>);
}
