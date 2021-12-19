import React from 'react';
import { useNavigate } from 'react-router';
import NavbarHome from './NavbarHome';

export default function Details(props) {
  const navigate = useNavigate();
  const name = props.val;
  const link = '/list/' + name;
  console.log(link);
  return <>
    <button 
      class="btn btn-sm btn-primary"
      onClick={() => {
      navigate(link);
    }
    }>Details</button>
  </>;
}
