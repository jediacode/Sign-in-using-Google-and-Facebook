const express = require("express");
Router = express.Router();
eventController = require("../controllers/event.js");

Router.get("/", eventController.rootRoute);

module.exports = Router;
