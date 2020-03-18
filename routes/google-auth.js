const express = require("express")
    passport  = require("passport")
    app = express()
    router = express.Router()
googlePassportSetup = require("../controllers/passport_google")



// router.get('/logout',(req,res,next)=>{
//     req.logout()
//     res.redirect("/")
// })

    router.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] }));


router.get("/auth/google/redirect",passport.authenticate('google',{successRedirect:'/secret',failureRedirect:'/login'}))
    


  module.exports = router