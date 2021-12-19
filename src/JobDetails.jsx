import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Delete from './Button/Delete';
import Edit from './Button/Edit';
import Favorite from './Button/Favorite';
import SetFav from './Button/SetFav';
import NoLoginFav from './Button/NoLoginFav';
import NavbarHome from './Button/NavbarHome';
import { Container, Row, Card, Button, Col } from "react-bootstrap";

export default function () {
    const jobName = useParams().jobName;
    const [job, setJob] = useState(null);
    const [loginName, setLoginName] = useState('');
    function findJobDetails() {
        axios.get('/api/job/find/' + jobName)
            .then(response => setJob(response.data))
            .catch(error => console.log("Could not find Job"));
    }
    useEffect(findJobDetails, []);
    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => setLoginName(response.data))
    }
    useEffect(checkLogin, []);
    const setFavComponent = (job != null && loginName != '') ?
        (<Col><SetFav val={job} name={loginName} /></Col>) :
        (<Col><NoLoginFav /></Col>);
    const fav = (job != null && loginName != '') ? <Favorite val={loginName} /> : <></>
    const delEditComponent =
        (job != null && loginName == job.owner) ? (
            <>
                <Col><Edit val={job._id} isUpdate="true" /></Col>
                <Col><Delete val={job._id} /></Col>
            </>
        ) : <></>;
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
                    <Card border="primary" style={{
                        width: '24rem',
                        paddingLeft: '0px',
                        paddingRight: '0px'
                    }} >
                        <Card.Header>Job Details</Card.Header>
                        <Card.Body>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Text>
                                Company: {job.owner}
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
                            <Container>
                                <Row className="justify-content-md-center">
                                    {setFavComponent}
                                    {delEditComponent}
                                </Row>
                            </Container>
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
                {jobComponent}
            </Container>
        </>
    )
}
