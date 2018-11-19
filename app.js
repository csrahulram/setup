var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var fs = require('fs');

var session = require('express-session');

var secret = 'app-secret';

app.use(session({ secret: secret, resave: true, saveUninitialized: true }));

app.secret = secret;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/setup');

var Schema = mongoose.Schema;

var taskSchema = new Schema({ title: String, status: String });

taskSchema.statics.findByName = function(task, cb) {
    return this.find({ task: new RegExp(task, 'i') }, cb);
  };
  
const Task = mongoose.model('task', taskSchema);

const cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

app.use(express.static(__dirname + '/dist/setup/'));

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});
 
app.get('/api/handshake', (req, res) => {
    res.status(200).send({'data':'Express api working'});
});

app.get('/api/getAllTask', (req, res) => {
    Task.find({}, (err, tasks)=>{
        res.status(200).send({'data':tasks});
    })
});

app.put('/api/createNewTask', (req, res) => {
    console.log(req.body);
    const newTask = new Task(req.body);
    newTask.save().then((doc) => {
        Task.find(doc, (err, tasks)=>{
            res.status(200).send({'data':tasks[0]});
        });
    });
});

app.delete('/api/deleteTask/:id', (req, res) => {
    Task.remove({_id: req.params.id}, (err, tasks)=>{
        res.status(200).send({'data':tasks});
    });
})

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000!')
});

module.exports = app;