import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Delete from './Button/Delete';
import Edit from './Button/Edit';
import { useNavigate } from 'react-router';

export default function() {
    const jobName = useParams().jobName;
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loginName, setLoginName] = useState('');
    function findJobDetails() {
        axios.get('http://localhost:8000/api/job/find/' + jobName)
            .then(response => setJob(response.data))
            .then(error => console.log("Could not find Job"));
    }
    useEffect(findJobDetails, []);
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => setLoginName(response.data))
    }
    useEffect(checkLogin, []);
    
    if(job != null) {
        console.log("job.owner "+ job.owner)
        console.log("loginName " + loginName)
        console.log(job != null)
        console.log(loginName === job.owner)
    }

    const delEditComponent = 
    (job != null && loginName == job.owner) ? (<>
        <Edit />
        <Delete />
    </>) : (<div>Not your Job</div>);
    const jobComponent = job ? 
        (<>
        <div>
           Job owner: {job.owner} 
        </div>
        <div>
           Job title: {job.title} 
        </div>
        <div>
            Job Name: {job.name}
        </div>
        <div>
            Job Location: {job.location}
        </div>
        <div>
            Job Description: {job.description}
        </div>
        <div>
            Email: {job.email}
        </div>
        <div>
            Posting Date: {job.pDate}
        </div></>) :
        (<div> No Job found </div>);
    return (<>
        <div>
            {jobComponent}
        </div>
        <div>
            {delEditComponent}
        </div>
    </>
    )
}
