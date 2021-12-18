import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import NavbarAdmin from './Button/NavbarAdmin';
import Details from './Button/Details';
import { useParams } from 'react-router';

export default function JobList() {
    //let newJob = [];
    const loginName = useParams().uName;
    const [newJob, setNewJob] = useState([]);
    function findAllJob() {
        console.log("We could find now!");
        console.log(loginName);
        axios.get('http://localhost:8000/api/users/' + loginName)
        .then(response => {
            console.log("We load now!");
            console.log(response.data.favorites);
            setNewJob(response.data.favorites);
            console.log("We load finished!");
            console.log(newJob);
        })
        .catch(error => console.error(error));
        console.log("What won!");
        console.log(newJob);
    }
    useEffect(findAllJob, []);

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
            <NavbarAdmin />
            <h1>Favorite Jobs</h1>
            {jobListComponent}
        </div>
    )
}
