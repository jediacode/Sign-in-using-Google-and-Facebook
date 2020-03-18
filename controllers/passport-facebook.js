const express = require("express")
      PassportF = require("passport")
      FacebookStrategy = require("passport-facebook").Strategy;
      facebookUser  = require("../models/facebookUser")
      

PassportF.serializeUser((user,done)=>{
    
    
    done(null,user.id)
})

PassportF.deserializeUser((id,done)=>{
    console.log(chalk.red("Facebook desrializeUser called"))
    facebookUser.findById(id)
    .then(user=>{
        
      done(null,user)
        
    })
    .catch(err=>{
        console.log(err)
        console.log("Something went wrong")
    })
})


      
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_API_KEY,
    
    clientSecret: process.env.FACEBOOK_API_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
    
  function(accessToken, refreshToken, profile, done) {
    //    User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //      return done(err, user);
    //    });
    
    console.log(profile)
    facebookUser.findOne({facebookId:profile.id})
    .then((current_user)=>{

        if(current_user){
            console.log(" facebook user already exist")
            done(null,current_user)
        }
        else{
            new facebookUser({
                username:profile.displayName,
                facebookId:profile.id
            })
        
            
                    .save()
                    .then((user_facebook)=>{
                        
                        console.log("New facebook user added")
                        
                        done(null,user_facebook)
                    })
                    .catch((err)=>{
                        console.log(err)
                        console.log("Something went wrong new user not added")
                    })

        }


    })
    .catch((err)=>{
        console.log(err)
        console.log("Something went wrong")
    })

     
  }
  
));
