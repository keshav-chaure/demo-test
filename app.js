const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

//sudo service mongod start|stop|restart
//above for terminal cmd 


const app =  express();
//Map global promise - get rid of warning
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/video-store',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('Mongodb connected.....'))
.catch(err => console.log(err));

// load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas');

// Handlebars Middleware
app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/views'));

// how middleware works
app.use(function(req,res,next){
 console.log(Date.now());
 req.name = 'Keshav';

 next();
});

// Index Route
app.get('/',(req,res)=>{
    console.log(req.name);
    const title='Welcome';
    res.render('index', {
        title
    })
});

//About Route
app.get('/about',(req,res)=>{
    res.render('about')
});

//Index Idea Route
app.get('/ideas',(req,res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
      
        res.render('ideas/index', {
            ideas:ideas
        })
    });
});

//Add Idea Route
app.get('/ideas/add',(req,res)=>{
    res.render('ideas/add')
});

app.post('/ideas',(req, res)=>{
// console.log(req.body)
// res.send('ok')
let errors = [];
if(!req.body.title){
    errors.push({text: 'Please add a title'})
}

if(!req.body.details){
    errors.push({text: 'Please add a detsils'})
}

if(errors.length > 0){
 res.render('ideas/add',{
     errors:errors,
     title: req.body.title,
     details: req.body.details
 });
}else{
    const newUser = {
        title: req.body.title,
        details: req.body.details
    }
    new Idea(newUser)
    .save()
    .then(idea => {
        res.redirect('/ideas');
    })
    
} 
}) 

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

