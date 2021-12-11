const express = require('express');
const auth_middleware = require('./auth_middleware');
const router = express.Router();
const JobAccessor = require('./models/Job.Model');

router.get('/findAll', function(request, response) {
  return JobAccessor.getAllJobs()
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

router.get('/findAllByName/:jobName', function(request, response) {
  const jobName = request.params.jobName;
  if(!jobName) {
    return response.status(422).send("Missing data");
  }
  return JobAccessor.findJobsssByName(jobName)
    .then((jobResponse) => {
        if(!jobResponse) {
            response.status(404).send("Job not found");
        }
        response.send(jobResponse);
    })
    .catch((error) => response.status(500).send("Issue getting job"))
});

router.get('/myJobs', auth_middleware, function(request, response) {
  return JobAccessor.findJobByOwner(request.username)
  .then(jobResponse => response.status(200).send(jobResponse))
  .catch(error => response.status(400).send(error))

})

router.get('/find/:jobName', function(request, response) {
  const jobName = request.params.jobName;
  if(!jobName) {
    return response.status(422).send("Missing data");
  }
  return JobAccessor.findJobByName(jobName)
    .then((jobResponse) => {
        if(!jobResponse) {
            response.status(404).send("Job not found");
        }
        response.send(jobResponse);
    })
    .catch((error) => response.status(500).send("Issue getting job"))
});

router.post('/create', auth_middleware, (request, response) => {
  const job = request.body;
  if(!job.name || !job.title || !job.location || !job.description || !job.email) {
    return response.status(422).send("Missing data");
  }
  job.owner = request.username;
  job.pDate = Date.now();
  JobAccessor.insertJob(request.body)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

module.exports = router; // <== Look at our new friend, module.exports!
