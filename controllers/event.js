const express = require("express")


exports.rootRoute = (req, res, next) => {
  res.render("events/show-events");
};

exports.secret=(req,res,next)=>{
    res.render('secret')
}


