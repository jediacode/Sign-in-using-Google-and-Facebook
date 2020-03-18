const express = require("express")
    mongoose = require("mongoose")

    var facebookUserSchema = new mongoose.Schema({

        username:{
            type:String,
            required:true
        },
        facebookId:{
            type:String,
            required:true
        }


    })

    module.exports = mongoose.model("FacebookUser",facebookUserSchema)