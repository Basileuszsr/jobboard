import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';


export default function CreateJob(props) {
    const navigate = useNavigate();
    return (<button onClick={
        () => navigate('/myJob')
    }>Create Job</button>);
}
