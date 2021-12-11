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
    return JobModel.findOne({_id: name}).exec();
}

function findJobsssByName(name) {
    return JobModel.find({name: name}).exec();
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
    findJobsssByName,
};
