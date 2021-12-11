import React from 'react';
import { useNavigate } from 'react-router';

export default function SignUp(props) {
    const navigate = useNavigate();
    return (<button onClick={
        () => navigate('/signup')
  }>Sign Up</button>);
}
