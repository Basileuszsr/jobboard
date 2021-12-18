import { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import CreateJob from './Button/CreateJob';
import Favorite from './Button/Favorite';
import Details from './Button/Details';
import Navbar from './Button/Navbar';
import NavbarAdmin from './Button/NavbarAdmin';

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
  <NavbarAdmin name={loginName} setLoginName={setLoginName}/> :
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
    <div>
      <div class="input-group mb-3">
        {errorMsg}
        {buttonComponent}
      </div>
      <div>
        <div class="input-group-prepend">
          <input type='text' value={formInput}
            onChange={(e) => {
              setError(null);
              setFormInput(e.target.value)
            }} />

          <button
            class="btn btn-outline-secondary" type="button"
            onClick={onSearchButtonClick}>
            Search Jobs
          </button>
        </div>
        <div>{jobListComponent}</div>
      </div>
      <Favorite val={loginName} />
      <CreateJob />
    </div>
  );
}

export default App;
