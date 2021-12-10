import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';


export default function() {
    const jobName = useParams().jobName;
    const [job, setJob] = useState(null);
    function findJobDetails() {
        axios.get('http://localhost:8000/api/job/find/' + jobName)
            .then(response => setJob(response.data))
            .then(error => console.log("Could not find Job"));
    }
    useEffect(findJobDetails, []);
    const jobComponent = job ? 
        (<>
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
    return (
        <div>
            {jobComponent}
        </div>
    )
}
