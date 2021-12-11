import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function JobList() {
    const [allJob, setAllJob] = useState([]);
    function findAllJob() {
        axios.get('api/job/findAll')
            .then(response => {
                setAllJob(response.data)
            })
            .catch(error => console.error(error));
    }
    useEffect(findAllJob, []);
    const jobListComponent = allJob.map(job => {
        return (<>
        <p></p>
        <Link to={job.name}>{job.name} {job.title} {job.location}</Link>
        </>)
    })
    return (
        <div>
            <h1>Favorite Jobs</h1>
            {jobListComponent}
        </div>
    )
}
