const express = require("express");
const app = express();
const admin=express()
const port = 5000;
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
// const methodOverride=require('method-override')
const mongoose = require('mongoose');
// const helmet = require("helmet");


//Import passport
const passport = require('passport');
require('./config/passport')(passport);



const session = require('express-session');
// body
app.use(express.urlencoded({extended:false}))

// Live Reload 
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
const { render } = require("ejs");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 



// DB config
const db = require('./config/keys').mongoURI;

// Conect TO MongoDB
mongoose
.connect(
  db,
  { useNewUrlParser: true ,useUnifiedTopology: true}
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));







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

//All routes
app.use('/user',require('./routes/user'))
app.use('/dashbord',require('./routes/dashbord'))
app.use('/AddProduct',require('./routes/AddProduct'))
app.use('/Cart',require('./routes/AddProduct'))






//Mongose Linke
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/user/loginpage`);
  });