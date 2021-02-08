const router = require('express').Router();
const path = require("path");
const Auth = require('../middleware/Auth');

router.get('/admin',Auth,(req,res) => {
    res.sendFile(path.join(__dirname,'../admin.html'));
    })

module.exports = router;