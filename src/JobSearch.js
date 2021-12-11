import { useState, useEffect} from 'react';
import axios, { Axios } from 'axios';
import Lgin from './Button/Lgin';
import SignUp from './Button/SignUp';
import Logout from './Button/Logout';
import CreateJob from './Button/CreateJob';
import Favorite from './Button/Favorite';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Details from './Button/Details';
import JobDetails from './JobDetails';

function App() {
  const [formInput, setFormInput] = useState('');
  const [loginName, setLoginName] = useState('');
  const [errorMsg, setError] = useState('');
  const navigate = useNavigate();


  function checkLogin() {
      axios.get('/api/users/whoIsLoggedIn')
          .then(response => setLoginName(response.data))
  }
  useEffect(checkLogin, []);


  const buttonComponent = loginName ?
  (<>
    <Favorite/>
    <CreateJob/>
    <Logout/>
  </>) : (<>
    <Lgin/>
    <SignUp/>
  </>)

  const [allJob, setAllJob] = useState([]);
  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }
    axios.get('/api/job/findAllByName/' + formInput)
      .then(response => setAllJob(response.data))
      .catch(error => setAllJob([{
        name: "No job found",
        title: '',
        location: '',
      }]));
  }

  const jobListComponent = allJob.length == 0 ? (<div>No Results.</div>) :allJob.map(job => {
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
      <Details val = {job.name}/>
    </>)
})

  return (
    <div>
      {errorMsg}
      <input type='text' value={formInput}
      onChange={(e) => {
        setError(null);
        setFormInput(e.target.value)
      }} />
      {buttonComponent}
      <button onClick={onSearchButtonClick}>
        Search for Job
      </button>
      <div>{jobListComponent}</div>
    </div>

  );
}

export default App;
