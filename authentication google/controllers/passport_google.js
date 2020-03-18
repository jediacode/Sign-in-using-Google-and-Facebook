const express = require("express")
      passport = require("passport")
      GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
      googleUser  = require("../models/googleUser")

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser((id,done)=>{
    googleUser.findById(id)
    .then(found_user=>{
      done(null,found_user)
        
    })
    .catch(err=>{
        console.log(err)
        console.log("Something went wrong")
    })
})


      
passport.use(new GoogleStrategy({
    clientID: '' 
    ,
    clientSecret: '',
    callbackURL: ""
  },
    
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });

    googleUser.findOne({googleId:profile.id})
    .then((current_user)=>{

        if(current_user){
            console.log("user already exist")
            done(null,current_user)
        }
        else{
            new googleUser({
                username:profile.displayName,
                googleId:profile.id
            })
        
            
                    .save()
                    .then((user)=>{
                        console.log("New user added")
                        console.log(user)
                        done(null,googleUser)
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
