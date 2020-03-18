const express = require("express")
      passportG = require("passport")
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
      googleUser  = require("../models/googleUser")

passportG.serializeUser((user,done)=>{
    done(null,user.id)
})

passportG.deserializeUser((id,done)=>{
    console.log(chalk.red("google deserializeUser function called"))
    googleUser.findById(id)
    .then(user=>{
        console.log(id)
        console.log("yayaya")
        
      done(null,user)
        
    })
    .catch(err=>{
        console.log(err)
        console.log("Something went wrong")
    })
})


      
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID 
    ,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },
    
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });

    googleUser.findOne({googleId:profile.id})
    .then((current_user)=>{

        if(current_user){
            console.log(" google user already exist")
            done(null,current_user)
        }
        else{
            new googleUser({
                username:profile.displayName,
                googleId:profile.id
            })
        
            
                    .save()
                    .then((user_google)=>{
                        console.log("New google user added")
                        
                        done(null,user_google)
                    })
                    .catch((err)=>{
                        console.log(err)
                        console.log("Somethig went wrong new user not added")
                    })

        }


    })
    .catch((err)=>{
        console.log(err)
        console.log("Something went wrong")
    })

     
  }
  
));
