const express =require("express")
 router = express.Router()
 secretController = require("../controllers/secret")

 authController = require("../controllers/auth")
 google_auth_middleware = require("../middlewares/googleAuth")

router.get("/",(req,res,next)=>{
    res.render("root")
})

 router.get("/login",authController.getLogin)

 router.get("/signup",authController.getSignUp)

 router.post("/login",authController.postLogin)

 router.post("/signup",authController.postSignUp)

 router.get("/secret",google_auth_middleware,secretController.secret)


 


 
 

 router.get("/logout",authController.logOut)


 module.exports=router