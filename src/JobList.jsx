import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarHome from './Button/NavbarHome';
import Details from './Button/Details';
import { useParams } from 'react-router';
import { Container, Row, Card, Button } from "react-bootstrap";

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
            <Container >
                <Row
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5px'
                    }}
                >
                    <Card border="primary" style={{ width: '18rem' }} >
                        <Card.Header>Favorite Jobs</Card.Header>
                        <Card.Body>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Text>
                                Job Name: {job.name}
                                <br />
                                Job Title: {job.title}
                                <br />
                                Job Location: {job.location}
                                <br />
                                Job Description: {job.description}
                                <br />
                                Email: {job.email}
                                <br />
                                Posting Date: {job.pDate}
                            </Card.Text>
                            <Details val={job._id} />
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>)
    }) : (<div>No Favorites</div>);

    return (
        <div>
            <NavbarHome />
            {jobListComponent}
        </div>
    )
}
