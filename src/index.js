import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import JobDetails from './JobDetails';
import JobList from './JobList';
import JobSearch from './JobSearch';
import Register from './Register';
import JobTracker from './JobTracker';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import Home from './Button/Home';


ReactDOM.render(
  <Router>
    <Home />
    <Routes>
      <Route path="/" element={<JobSearch />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myJob" element={<JobTracker />} />
      <Route path="/list" element={<JobList />} />
      <Route path="/list/:jobName" element={<JobDetails />} />
    </Routes>
  </Router>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
