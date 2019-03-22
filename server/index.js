import routers from "./routes";
import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')

export default path => {
  // Create Instance of Express
  const app = express();

  // Run Morgan for Logging
  app.use(logger("dev"));
  app.use(bodyParser.json());

  app.use(express.static(`${path}/client`));
  app.use("/api/organization", routers.organization);
  app.use("/api/job", routers.job);
  app.use("/api/user", routers.user);

  // Any non API GET routes will be directed to our React App and handled by React Router
  app.get("*", (req, res) => {
    res.sendFile(`${path}/client/index.html`);
  });

  // app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
  app.use(passport.initialize());
  
  app.use(passport.session());

  return app;
  // -------------------------------------------------
};
