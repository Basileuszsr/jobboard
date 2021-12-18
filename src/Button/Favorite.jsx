import React from 'react';
import { useNavigate } from 'react-router';

export default function Favorite(props) {
    const navigate = useNavigate();
    const name = props.val;
    return (<button class="btn btn-lg btn-primary btn-block" onClick={() => navigate('/user/' + name)
  }>Favorites</button>);
}
