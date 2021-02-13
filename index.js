const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/user');
const dotenv = require('dotenv').config();
const MongoDBStore = require('connect-mongodb-session')(session);

const uri = process.env.MONGO_URI;
const store = new MongoDBStore({
    uri: uri,
    collection: 'users'
  });
  
app.use(bodyParser.urlencoded({extended:false}));
app.use('/public' , express.static('public'));


app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      cookie: store
    })
  );

app.use((req, res, next) => {
      // throw new Error('Sync Dummy');
      if (!req.session.user) {
        return next();
      }
      User.findById(req.session.user._id)
        .then(user => {
          if (!user) {
            return next();
          }
          req.user = user;
          next();
        })
        .catch(err => {
          next(new Error(err));
        });
});

app.use('/',adminRoutes);
app.use('/',userRoutes);



const PORT = process.env.PORT

mongoose.connect(uri,{
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).
then(result => {
    console.log("DB Connected!");
    app.listen(PORT , () => {
        console.log("App Is Running On 8000.");
    })
}).
catch(err => {
    console.log(err);
});
