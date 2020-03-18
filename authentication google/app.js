const express = require("express"),
      passport = require("passport"),
      
    

      session = require("express-session")
      bodyParser = require("body-parser")
      
      mongodbStore = require("connect-mongodb-session")(session)
      mongoose  = require("mongoose")
      flash = require("connect-flash")


      passportSetup = require("./controllers/passport_google")

      authRoutes = require("./routes/auth")
      passportGoogle = require("./routes/google-auth")
      




const mongodb_uri = "mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/auth"
      app = express()


      app.use(express.static('public'))
      app.set("view engine",'ejs')
      app.use(bodyParser.urlencoded({extended:false}))

    

      

   

      const store = new mongodbStore({
          uri:mongodb_uri,
          collection:'sessions'
      })

      app.use(session({
          secret:'my secret',
          resave:false,
          saveUninitialized:false,
          store:store
      }))


      app.use((req,res,next)=>{
        if(req.user){
            res.locals.loggedIn=true
        }

        next();
        
    })
    //    //   initialize passport
    app.use(passport.initialize())
    app.use(passport.session())


      app.use(flash())
      app.use(authRoutes)
      app.use(passportGoogle)

      


      mongoose.connect("mongodb+srv://Shubham:shubham@cluster0-77hwr.mongodb.net/auth")
      .then((data)=>{
          
      port = process.env.PORT||3000;
      app.listen(port,()=>{
          console.log(`Server is started at ${port}`)
      })
          
      })
      .catch((err)=>{
          console.log(err)
          console.log("Database connection error")
      })
