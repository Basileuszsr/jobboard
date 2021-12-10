const Schema = require('mongoose').Schema;

exports.JobSchema = new Schema({
    owner: String,
    title: String,
    name: String,
    location: String,
    description : String,
    email: String,
    website: String,
    pDate: Date,
// this explicitly declares what collection we're using
}, { collection : 'jobs' });
