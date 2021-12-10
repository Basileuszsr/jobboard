const mongoose = require("mongoose");
const JobSchema = require('../schema/Job.Schema').JobSchema;

const JobModel = mongoose.model("Job", JobSchema);

function insertJob(job) {
    return JobModel.create(job);
}

function getAllJobs() {
    return JobModel.find().exec();
}

function findJobByName(name) {
    return JobModel.findOne({name: name}).exec();
}

function findJobByOwner(owner) {
    return JobModel.find({
        owner: owner
    }).exec();
}

module.exports = {
    findJobByOwner,
    insertJob,
    findJobByName,
    getAllJobs,
};
