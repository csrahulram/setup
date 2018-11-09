var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var fs = require('fs');

var session = require('express-session');

var secret = 'meanseed';

app.use(session({ secret: secret, resave: true, saveUninitialized: true }));

app.secret = secret;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/setup');

var Schema = mongoose.Schema;

var taskSchema = new Schema({ task: String, status: String });

taskSchema.statics.findByName = function(task, cb) {
    return this.find({ task: new RegExp(task, 'i') }, cb);
  };

const Task = mongoose.model('task', taskSchema);

const newTask = new Task ({ task: 'Complete this setup project.' });
newTask.save().then(() => console.log('Task Saved.'));

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

app.use(express.static(__dirname + '/dist/setup/'));

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.get('/api/read', (req, res) => {
    res.status(200).send({'data':'Express api working'});
    Task.findByName('Complete this setup project.', (err, tasks)=>{
        console.log(tasks)
    })
});

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000!')
});

module.exports = app;