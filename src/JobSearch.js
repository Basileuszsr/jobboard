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
import NavbarHome from './Button/NavbarHome';

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

  function onSearchButtonClick(e) {
    e.preventDefault();
    console.log(formInput)
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }
    axios.get('/api/job/findAllByName/' + formInput)
      .then(response => {
        if (response.data.length === 0) {
          setText('No results');
        } else {
          setAllJob(response.data);
        }
      })
      .catch(error => {
        console.log(error)
        setAllJob([{
          name: "No job found",
          title: '',
          location: '',
          id: '',
        }])
      });
  }

  const fav = loginName ? <Favorite val={loginName} /> : <></>
  const create = loginName ? <CreateJob /> : <></>

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
                console.log(formInput)
                setFormInput(e.target.value)
              }} />
            <Button type="submit" onClick={e => onSearchButtonClick(e)}>Search</Button>
          </Form.Group>
          <Container>
            {errorMsg}
          </Container>
        </Form>
        <Table>
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
        {fav}
        {create}
      </Container>
    </>
  );
}

export default App;
