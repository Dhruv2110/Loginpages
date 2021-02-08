const router = require('express').Router();
const User = require('../models/user');
const path = require("path");

router.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'../index.html'));

})

router.get('/login',(req,res,next) => {
    res.redirect('/');
})

router.post('/login',(req,res,next) => {
    const username = req.body.email;
    const password = req.body.pass;
    //console.log(username,password);

    User
        .findOne({email: username.toLowerCase(),password: password})
        .then((user) => {
            if (user) {
                //console.log(user);
                req.session.user = user;
                return req.session.save(err => {
                        //console.log(err);
                        return res.sendFile(path.join(__dirname,'../success.html'));
                    });
                
            }
            else{

                return res.sendFile(path.join(__dirname,'../error.html'));
            }

        })
        .catch(err => {
            console.log(err)
            return res.sendFile(path.join(__dirname,'../error.html'));
        })

})

module.exports = router;