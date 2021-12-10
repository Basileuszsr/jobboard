const express = require('express');
const job = require('./routes/job.js');
const users = require('./routes/user.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');

//Setup MongoDB Connection
const mongoString = 'mongodb+srv://web:1@zsrwebdev.bup61.mongodb.net/jobboard?retryWrites=true&w=majority'
mongoose.connect(mongoString, { useNewUrlParser: true })

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const app = express();

// app.use(session({secret: "SUPER_DUPER_SECRET"}));
app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

app.use(cors());

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/job', job);  
app.use('/api/users', users);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

app.get('/banana', (req, res) => {
    res.send('NOT BANANA!');
});

// https://www.amazon.com/gp/css/order-history

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  

app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
});