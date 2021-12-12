import { useState, useEffect} from 'react';
import axios, { Axios } from 'axios';
import Lgin from './Button/Lgin';
import SignUp from './Button/SignUp';
import Logout from './Button/Logout';
import CreateJob from './Button/CreateJob';
import Favorite from './Button/Favorite';
import Details from './Button/Details';

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
  (<>
    <Favorite val={loginName}/>
    <CreateJob/>
    <Logout setLoginName={setLoginName}/>
    {loginName}
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

  const jobListComponent = allJob.length == 0 ? (<div>{text}</div>) :allJob.map(job => {
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
      <Details val = {job._id}/>
    </>)
})

  return (
    <div>
      {errorMsg}
      {buttonComponent}
      <div>
        <input type='text' value={formInput}
        onChange={(e) => {
          setError(null);
          setFormInput(e.target.value)
        }} />
        
        <button onClick={onSearchButtonClick}>
          Search for Job
        </button>
      </div>
      <div>{jobListComponent}</div>
    </div>

  );
}

export default App;
