const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const popup = require('node-popup');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/public' , express.static('public'));

app.get('/',(req,res,next) => {
    res.sendFile('D:/Practice/Node/Login/index.html');
    //res.send('HEllo');

})

app.get('/login',(req,res,next) => {
    res.redirect('/');
})

app.post('/login',(req,res,next) => {
    const username = req.body.email;
    const password = req.body.pass;
    //console.log(username,password);

    if(username == 'abc' && password == '123')
    {
        res.sendFile('D:/Practice/Node/Login/success.html');
    }
    else{ 
        res.sendFile('D:/Practice/Node/Login/error.html');
    }


})

const PORT = process.env.PORT || 8000;

app.listen(PORT,() => {
    console.log('Listening on 8000',__dirname);

})