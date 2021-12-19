import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Delete from './Button/Delete';
import Edit from './Button/Edit';
import Favorite from './Button/Favorite';
import SetFav from './Button/SetFav';
import NoLoginFav from './Button/NoLoginFav';
import NavbarHome from './Button/NavbarHome';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import { Container, Row, Card, Button } from "react-bootstrap";

export default function () {
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
    const setFavComponent = (job != null && loginName != '') ? (<SetFav val={job} name={loginName} />) : (<NoLoginFav />);
    const fav = (job != null && loginName != '') ? <Favorite val={loginName} /> : <></>
    const delEditComponent =
        (job != null && loginName == job.owner) ? (<>
            <Edit val={job._id} />
            <Delete val={job._id} />
        </>) : <></>;
    const jobComponent = job ?
        (<>

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
                        <Card.Header>Job Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Text>
                                Job owner: {job.owner}
                                <br />
                                Job title: {job.name}
                                <br />
                                Job Location: {job.location}
                                <br />
                                Job Description: {job.description}
                                <br />
                                Email: {job.email}
                                <br />
                                Posting Date: {job.pDate}
                            </Card.Text>
                            {setFavComponent}
                        </Card.Body>
                    </Card>
                </Row>

            </Container>

        </>
        ) :
        (<div> No Job found </div>);

    return (
        <>
            <NavbarHome />
            <Container fluid>

                <div>
                    {jobComponent}
                </div>
                <div>
                    {delEditComponent}
                </div>

            </Container>

        </>
    )
}

{/* <div>


          <Container className="justify-content-md-center">
                <Row md="auto">
                </Row>

            </Container>


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
            </div></>) */}
