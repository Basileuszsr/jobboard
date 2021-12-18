import React from 'react';
import { useNavigate } from 'react-router';

export default function CreateJob(props) {
    const navigate = useNavigate();
    return (<button class="btn btn-lg btn-primary btn-block" onClick={
        () => navigate('/myJob')
    }>Create Job</button>);
}
