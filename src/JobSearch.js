import { useState, useEffect } from 'react';
import axios from 'axios';
import CreateJob from './Button/CreateJob';
import Favorite from './Button/Favorite';
import Details from './Button/Details';
import Navbar from './Button/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function App() {
  const [formInput, setFormInput] = useState('');
  const [loginName, setLoginName] = useState('');
  const [errorMsg, setError] = useState('');
  const [allJob, setAllJob] = useState([]);
  const [text, setText] = useState('Start Searching!');

  function checkLogin() {
    axios.get('/api/users/whoIsLoggedIn')
      .then(response => setLoginName(response.data))
  }
  useEffect(checkLogin, []);

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

  const jobListComponent = allJob.length == 0 ? (
  <tr>
    <td>
      {text}
    </td>
    <td>
    </td>
    <td>
    </td>
    <td>
    </td>
  </tr>
  ) : allJob.map(job => {
    console.log(allJob.length)
    return (
      <tr>
        <td>
          {job.name}
        </td>
        <td>
          {job.title}
        </td>
        <td>
          {job.location}
        </td>
        <td>
          <Details val={job._id} />
        </td>
      </tr>
    )
  })

  return (
    <>
      <Navbar name={loginName} setLoginName={setLoginName} />
      <Container>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Job Key Word"
              onChange={e => {
                setFormInput(e.target.value)
              }} />
            <Button type="submit" onClick={onSearchButtonClick}>Search</Button>
          </Form.Group>
          <Container>
            {errorMsg}
          </Container>
        </Form>
        <Table striped bordered >
          <thead>
            <tr>
              <th>Job Name</th>
              <th>Job Title</th>
              <th>Job Location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {jobListComponent}
          </tbody>
        </Table>
        <Favorite val={loginName} />
        <CreateJob />
      </Container>
    </>
  );
}

export default App;
