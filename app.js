const express = require("express");
const bodyParser=require('body-parser')
const app = express();
const admin=express()
const port = 5000;
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
const methodOverride=require('method-override')
const mongoose = require('mongoose');
const helmet = require("helmet");
const config=require('./config/keys')

const crypto = require('crypto');

const path=require('path')
const multer=require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

const Grid=require('gridfs-stream')



// Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // set up ejs for templating

//Import passport
const passport = require('passport');
require('./config/passport')(passport);



const session = require('express-session');
 




// Live Reload 
// const path = require("path");
// const livereload = require("livereload");
// const liveReloadServer = livereload.createServer();
// liveReloadServer.watch(path.join(__dirname, 'public'));
// const connectLivereload = require("connect-livereload");
// const { render } = require("ejs");
// app.use(connectLivereload());
 
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/");
//   }, 100);
// }); 


// DB config
const url  = require('./config/keys').mongoURI;

// Conect TO MongoDB
 mongoose.connect(
  url ,
  { useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));




// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//Express body parser
app.use(express.urlencoded({ extended: true }));

//Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//helmet 
// app.use(helmet()); 

//All routes
app.use('/users',require('./routes/users'))
app.use('/dashbord',require('./routes/dashbord'))
app.use('/AddBooks',require('./routes/AddBooks'))
app.use('/images',require('./routes/images'))

//Mongose Linke
app.listen(process.env.PORT  || port, () => {
    console.log(`Example app listening at http://localhost:${port}/users/register`);
  });