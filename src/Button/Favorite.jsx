import React from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';

export default function Favorite(props) {
    const navigate = useNavigate();
    const name = props.val;
    return (<button 
      class="btn btn-primary btn-block mr-1" 
      onClick={() => navigate('/user/' + name)
  }>Favorites</button>);
}
