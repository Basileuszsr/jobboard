import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Details from './Button/Details';

export default function JobList() {
    let newJob = [];
    const [loginName, setLoginName] = useState('');
    const [allJob, setAllJob] = useState([]);
    const navigate = useNavigate();
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => {
                console.log("We have the user Info");
                setLoginName(response.data);
            })
            .catch(() => navigate('/login'))
    }
    useEffect(checkLogin, []);

    function findAllJob() {
        if (loginName !== null && loginName !== undefined && loginName !== '') {
            console.log("We could find now!");
            console.log(loginName);
            console.log()
            axios.get('api/users/' + loginName)
            .then(response => {
                console.log("We load now!");
                console.log(response.data.favorites);
                setAllJob(response.data.favorites);
                newJob = [...response.data.favorites];
                console.log("We load finished!");
                console.log(newJob);
                console.log(allJob);
            })
            .catch(error => console.error(error));
            console.log("What won!");
            console.log(newJob);
        } else {
            console.log("Fail");
        }
    }
    useEffect(findAllJob, [loginName]);

    const jobListComponent = newJob.length !== 0 ? newJob.map(job => {
        return (<>
            <div>
                Job Name: {job.name}
            </div>
            <div>
                Job Title: {job.title}
            </div>
            <div>
                Job Location: {job.location}
            </div>
            <Details val = {job._id}/>
        </>) 
    }) : (<div>No Favorites</div>);

    return (
        <div>
            <h1>Favorite Jobs</h1>
            {jobListComponent}
            {/* <JobItems val={setAllJob}/> */}
        </div>
    )
}
