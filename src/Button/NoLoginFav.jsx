import React from 'react';
import { useNavigate } from 'react-router';

export default function NoLoginFav(props) {
    const navigate = useNavigate();
    return (<button onClick={
        () => navigate('/login')
  }>Like</button>);
}