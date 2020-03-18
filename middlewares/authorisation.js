module.exports=(req,res,next)=>{

    if(req.user||req.session.user){
      next()
    }
    else{
      res.redirect("/login")
    }
  
}