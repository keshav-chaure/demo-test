const express = require('express');

const app =  express();

// how middleware works
app.use(function(req,res,next){
 console.log(Date.now());
 req.name = 'Keshav';

 next();
});

// Index Route
app.get('/',(req,res)=>{
    console.log(req.name)
    res.send('Index')
});

//About Route
app.get('/',(req,res)=>{
    res.send('About')
});

const port = 5000;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

