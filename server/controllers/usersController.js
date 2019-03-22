const db = require("../models");
const jwt = require('jsonwebtoken');
import jwtSecret from '../../jwtSecret'

const BCRYPT_SALT_ROUNDS = 12;


const bcrypt = require('bcrypt');

const passport = require('passport')
  , localStrategy = require('passport-local').Strategy;


const secret = process.env.jwt|| jwtSecret
// Defining methods for the booksController
const controller = {
removeBookmark: (req, res) => {
    db.User.delete({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
},
getBookmarks: (req, res) => {
  console.log(req.params.username)
  db.User.findOne({
    where: {
      username: req.params.username
    }
  })
  .then(user => {
    console.log(user)
    if(!user) {
      res.send("No user")
    }
    else {
      let bookmarks = user.bookmarks.split(",")
      console.log(bookmarks)
      console.log(typeof(bookmarks))
      res.status(200).send({bookmarks: bookmarks})
    }
  }
    ).catch(err => res.status(422).json(err))
},
addBookmark: function(req, res) {
  console.log(req.params.username)
  db.User.findOne({
    where: {
      username: req.params.username
    }
  })
  .then(user => {
    console.log(user.bookmarks)
    let updatedBookmarks = user.bookmarks + "," + req.body.bookmark
    if (user.bookmarks == null) {
      db.User.update({
        bookmarks: req.body.bookmark
      }, {
        where: {
          username: req.params.username
        }
      })
    }
    else {
      db.User.update({
        bookmarks: updatedBookmarks
      }, {
        where: {
          username: req.params.username
        }
      })
    }
  })
  .then(response => res.json(response))
  .catch(err => res.status(422).json(err));
},
signIn: function (req, res) {
  db.User.findOne({
    where: {
      username: req.body.username
    }
  }).then(function (user) {
    if(!user){
      res.send('Username not found')
    }
    else {
    bcrypt.compare(req.body.password, user.password).then(function (pass) {
      if (pass === true && req.body.username === user.username) {
        console.log('hi')

        const currentUser = {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          description: user.description
        }
      
        const token = jwt.sign({
          auth: currentUser.username,
          agent: req.headers['user-agent'],
          currentUser:{ currentUser },
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // Note: in seconds!
        }, secret);

       
        res.send({
          "token": token,
          "code":200,
          "loggedIn": true,
          "success":"Login successful",
          "username": user.username,
          "email": user.email,
          "firstname": user.firstname,
          "lastname": user.lastname,
          "description": user.description
            });
        
            
      } else {
        res.send("noMatch");
        console.log('you got it wrong')
      }
    }).catch(error => console.log(error))
  }
})
},

  getUserPins: (req, res) => {
    db.User.findOne({
      where: {
        username: req.params.username
      }
    })
    .then(user => {

      if(!user) {
        res.send("no user")
      }
      else {
        console.log(user.pins)
        const userPins = user.pins
        res.send(JSON.parse(userPins))
      }
    }
      ).catch(res.status(422).json(err))
  },
  updateProfile: (req, res) => {
    db.User.update({
      description: req.body.description,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    }, {
      where: {
        username: req.body.username
      }
    })
    .then(user => res.status(200).send({
     "code": 200
     
    }))
    .catch(err => res.status(422).json(err));
  },
  authUser: (req, res) => {
    let authenticateUser;
     jwt.verify(req.body.userToken, secret, function(err, decoded) {      
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });    
     } else {

      //if everything is good, save to request for use in other routes
       req.decoded = decoded;    
      authenticateUser= decoded.currentUser.currentUser.userId  
        return authenticateUser   
     }
   });
  console.log( authenticateUser)
    db.User.findOne({
      where: {
        id:authenticateUser
      }
    })
      .then(user => {

         
       const userInfo={
        username: user.username,
        email: user.email
        }
        res.json(userInfo)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
        
      }
    })
    .then(dbModel => {
      if(dbModel) {
        res.json(dbModel);
      }
      else {
        res.status(404).json({
          message: "Id not found."
        });
      }
    })
    .catch(err => res.status(422).json(err));
  },
  createUser: function(req,res) {
    console.log(req.body)
    let password = req.body.password
  
    db.User.findOne({where:{ username: req.body.username }})
    .then(function (user) {
      if(!user){
          let hashedPassword = bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
          console.log(hashedPassword)
          db.User.create({ 
            username: req.body.username, 
            password: hashedPassword, 
            email: req.body.email,
          })
        })
 
      } else {
        res.status(404).json('Username already exists!');
      }
    })
    .catch(err => res.status(422).json(err));
},
logIn: function(req, res) {
  db.User.findOne({
    where:{
      username: req.body.username
    }
  })
  .then(function(user){
    if(!user){
      res.send("Username not found")
    }
    else {

      if (req.body.password === user.password){
        const currentUser = {
          username: user.username,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          description: user.description
        }
        const token = jwt.sign({
          auth: user.username,
          agent: req.headers['user-agent'],
          currentUser:{ currentUser },
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60, // Note: in seconds!
        }, secret);


        res.send({
          "token": token,
          "code":200,
          "loggedIn": true,
          "success":"Login successful",
          "username": user.username,
          "email": user.email,
          "firstname": user.firstname,
          "lastname": user.lastname,
          "description": user.description
            });
            return
      }
      else {
        res.send({
          "code":204,
          "success":"Username and password do not match"
            });
      }
    }
  })
},
  create: function(req, res) {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      pins: req.body.pins
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User.delete({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  }
}

export { controller as default };