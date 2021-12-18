import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import CreateJob from './Button/CreateJob';
import Favorite from './Button/Favorite';
import Details from './Button/Details';
import Navbar from './Button/Navbar';
import NavbarAdmin from './Button/NavbarAdmin';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function App() {
  const [formInput, setFormInput] = useState('');
  const [loginName, setLoginName] = useState('');
  const [errorMsg, setError] = useState('');
  const [text, setText] = useState('Start Searching!');

  function checkLogin() {
    axios.get('/api/users/whoIsLoggedIn')
      .then(response => setLoginName(response.data))
  }
  useEffect(checkLogin, []);

  const buttonComponent = loginName ?
    <NavbarAdmin name={loginName} setLoginName={setLoginName} /> :
    <Navbar />

  const [allJob, setAllJob] = useState([]);
  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }
    axios.get('/api/job/findAllByName/' + formInput)
      .then(response => {
        setAllJob(response.data);
        if (response.data.length === 0) {
          setText('No results');
        }
      })
      .catch(error => setAllJob([{
        name: "No job found",
        title: '',
        location: '',
      }]));
  }

  const jobListComponent = allJob.length == 0 ? (<div>{text}</div>) : allJob.map(job => {
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
      <Details val={job._id} />
    </>)
  })

  return (
    <>
      {buttonComponent}
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Job Key Word" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onSearchButtonClick}>
          Submit
        </Button>
        <Container>
          {errorMsg}
        </Container>
      </Form>

      {jobListComponent}
      <Favorite val={loginName} />
      <CreateJob />
    </>
  );
}

export default App;
