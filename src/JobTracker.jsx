import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function JobTracker(props) {
    const navigate = useNavigate();
    const [jobForm, setJobForm] = useState({
        name: '',
        title: '',
        location: '',
        description: '',
        email: '',
        website: '',
        owner: '',
        pDate: null,
    });
    const [errorMsg, setError] = useState('');
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success"))
            .catch(() => navigate('/login'))
    }
    useEffect(checkLogin, []);

    return (
        <div>
            {errorMsg}
            <h5>Job Name:</h5>
            <input value={jobForm.name} 
            onChange={e => setJobForm({
                ...jobForm,
                name: e.target.value
            })} ></input>
            <h5>Title:</h5>
            <input value={jobForm.title} 
            onChange={e => setJobForm({
                ...jobForm,
                title: e.target.value
            })} ></input>
            <h5>Location:</h5>
            <input value={jobForm.location}
            onChange={e => setJobForm({
                ...jobForm,
                location: e.target.value
            })} ></input>

            <h5>Description:</h5>
            <input value={jobForm.description}
            onChange={e => setJobForm({
                ...jobForm,
                description: e.target.value
            })} ></input>

            <h5>Email:</h5>
            <input value={jobForm.email}
            onChange={e => setJobForm({
                ...jobForm,
                email: e.target.value
            })} ></input>

            <h5>Website:</h5>
            <input value={jobForm.website}
            onChange={e => setJobForm({
                ...jobForm,
                website: e.target.value
            })} ></input>

            <button onClick={
                () => {
                    axios.post('/api/job/create', jobForm)
                    .then(response => {
                        //getMyJobs()
                        console.log(response)
                        navigate('/list/' + response.data._id);
                    })
                    .catch(error => setError("Something Missing!"));
                    }
            }>
                Submit
            </button>
            {/* {jobElement} */}
        </div>
    )


}
