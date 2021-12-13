import React from 'react';
import { useNavigate } from 'react-router';

export default function Favorite(props) {
    const navigate = useNavigate();
    const name = props.val;
    return (<button onClick={() => navigate('/user/' + name)
  }>Favorites</button>);
}
