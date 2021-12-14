import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Delete from './Button/Delete';
import Edit from './Button/Edit';
import Favorite from './Button/Favorite';
import SetFav from './Button/SetFav';
import NoLoginFav from './Button/NoLoginFav';
import { useNavigate } from 'react-router';

export default function() {
    const jobName = useParams().jobName;
    const [job, setJob] = useState(null);
    const [loginName, setLoginName] = useState('');
    function findJobDetails() {
        axios.get('http://localhost:8000/api/job/find/' + jobName)
            .then(response => setJob(response.data))
            .catch(error => console.log("Could not find Job"));
    }
    useEffect(findJobDetails, []);
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => setLoginName(response.data))
    }
    useEffect(checkLogin, []);
    const delEditComponent = 
    (job != null && loginName == job.owner) ? (<>
        <Edit val={job._id}/>
        <Delete val={job._id}/>
    </>) : (<div>Not your Job</div>);
    const jobComponent = job ? 
        (<>
        <Favorite val={loginName}/>
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
    const setFavComponent = (job != null && loginName != '') ? (<SetFav val={job} name={loginName}/>) : (<NoLoginFav />);
    return (<>
        <div>
            {jobComponent}
        </div>
        <div>
            {delEditComponent}
        </div>
        {setFavComponent}
    </>
    )
}
