import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';

export default function JobList() {
    const [allJob, setAllJob] = useState([]);
    const navigate = useNavigate();
    function findAllJob() {
        axios.get('api/job/findAll')
            .then(response => {
                setAllJob(response.data)
            })
            .catch(error => console.error(error));
    }
    useEffect(findAllJob, []);
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success"))
            .catch(() => navigate('/login'))
    }
    useEffect(checkLogin, []);
    const jobListComponent = allJob.map(job => {
        return (<>
        <p></p>
        <Link to={job._id}>{job.owner} {job.title} {job.location}</Link>
        </>)
    })
    return (
        <div>
            <h1>Favorite Jobs</h1>
            {jobListComponent}
        </div>
    )
}
