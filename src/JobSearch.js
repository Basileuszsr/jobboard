import { useState } from 'react';
import axios, { Axios } from 'axios';

function App() {
  const [formInput, setFormInput] = useState('');
  const [job, setJob] = useState({
    name: 'No job selected', title: '',
  })
  const [errorMsg, setError] = useState(null);

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
    </div>
 
  );
}

export default App;
