const express = require('express');

const exphbs = require('express-handlebars');
const app =  express();

// Handlebars Middleware

app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');

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

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

