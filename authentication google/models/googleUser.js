const express = require("express")
    mongoose = require("mongoose")

    var googleUserSchema = new mongoose.Schema({

        username:{
            type:String,
            required:true
        },
        googleId:{
            type:String,
            required:true
        }


    })

    module.exports = mongoose.model("GoogleUser",googleUserSchema)