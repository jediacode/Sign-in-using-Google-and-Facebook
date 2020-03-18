require('dotenv').config()

const express = require("express");
app = express();
chalk = require("chalk")
port = process.env.port || 3000;
eventRoutes = require("./routes/event.js");



passport = require("passport"),
      
    

session = require("express-session")
bodyParser = require("body-parser")
passportFacebook = require("./routes/facebook-auth")


mongodbStore = require("connect-mongodb-session")(session)
mongoose  = require("mongoose")
flash = require("connect-flash")




authRoutes = require("./routes/auth")
passportGoogle = require("./routes/google-auth")




app.use(express.static('public'))
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended:false}))








const store = new mongodbStore({
  uri:process.env.DBURL,
  collection:'sessions'
})

app.use(session({
  secret:'my secret',
  resave:false,
  saveUninitialized:false,
  store:store
}))



//    //   initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res,next)=>{

  


  if(req.isAuthenticated()){
  res.locals.user=req.user
  res.locals.isLoggedIn = req.isAuthenticated()


  }

  
  else{
    res.locals.user=req.session.user
  res.locals.isLoggedIn = req.session.isAuthenticated

  }



  next();
  
  })


app.use(flash())

app.use(passportFacebook)

app.use(authRoutes)


app.use(eventRoutes);
app.use(passportGoogle)




mongoose.connect(process.env.DBURL)
.then((data)=>{
    
port = process.env.PORT||3000;
app.listen(port,()=>{
    console.log(chalk.red(`Server is started at ${port}`))
})
    
})
.catch((err)=>{
    console.log(err)
    console.log("Database connection error")
})
