import React from 'react';
import { useNavigate } from 'react-router';

export default function Details(props) {
    const navigate = useNavigate();
    const name = props.val;
    const link = '/search/' + name;
    console.log(link);
    return (<button onClick={() => {
        console.log(link);
        navigate(link);
    }
  }>Details</button>);
}
