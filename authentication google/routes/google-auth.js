const express = require("express")
    passport  = require("passport")
    app = express()
    router = express.Router()


// router.get('/logout',(req,res,next)=>{
//     req.logout()
//     res.redirect("/")
// })

    router.get('/auth/google',
passport.authenticate('google', { scope: ['profile'] }));


router.get("/auth/google/redirect",passport.authenticate('google'),(req,res)=>{
    res.redirect("/secret")
})

  module.exports = router