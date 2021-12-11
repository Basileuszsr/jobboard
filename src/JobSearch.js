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
  const [job, setJob] = useState({
    name: '', title: '',
  })
  const [errorMsg, setError] = useState('');
  const navigate = useNavigate();
  function checkLogin() {
      axios.get('/api/users/whoIsLoggedIn')
          .then(response => setLoginName(response.data))
          .catch(() => navigate('/'))
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
  function onSearchButtonClick() {
    if (!formInput) {
      setError("You must type in a Job name.");
      return;
    }

    axios.get('/api/job/find/' + formInput)
      .then(response => setJob(response.data))
      .catch(error => setJob({
        name: "No job found",
        title: '',
        location: '',
      }));
    // doSomething();
  }
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
    </div>

  );
}

export default App;
