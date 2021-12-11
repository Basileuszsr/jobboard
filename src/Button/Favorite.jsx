import React from 'react';
import { useNavigate } from 'react-router';

export default function Favorite(props) {
    const navigate = useNavigate();
    return (<button onClick={() => navigate('/list')
  }>Favorites</button>);
}
