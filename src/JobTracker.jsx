import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavbarHome from './Button/NavbarHome';
import { Container, Row, Card } from "react-bootstrap";

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
            <NavbarHome />
            {errorMsg}

            <Container >
                <Row
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5px'
                    }}
                >

                    <Card border="primary" style={{
                        width: '18rem',
                        paddingLeft: '0px',
                        paddingRight: '0px'
                    }}>
                        <Card.Header>Create a Job Post</Card.Header>
                        <Card.Body>
                            <h5>Company:</h5>
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

                            <p></p>

                            <button
                                class="btn btn-primary btn-block"
                                onClick={
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
                        </Card.Body>
                    </Card>
                    {/* {jobElement} */}
                </Row>
            </Container>
        </div>
    )


}
