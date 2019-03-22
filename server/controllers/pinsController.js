const db = require("../models");

const controller = {
  downVote: (req, res) => {
    console.log(req.body)
    db.Pins.findOne({
      where: {
        id: req.body.id
      }
    }).then(pin => {

      const username = req.body.username;

      const downvoters = pin.downvoters.split(',');

      const upvoters = pin.upvoters.split(',');

    
      const newuv = req.body.username + pin.downvoters
      const newdv = req.body.username + ',' + pin.downvoters
    

      if(downvoters.indexOf(username) !== -1) {
        console.log('first if')
        const position = downvoters.indexOf(username)
        downvoters.splice(position, 1);
        const finalString = downvoters.toString();
        console.log(finalString)
        db.Pins.update({
          score: (pin.dataValues.score + 1),
          downvoters: finalString
        }, { 
          where: {
          id: req.body.id
        }
      }).then(info => console.log('HI'))
    

      }
      else if (upvoters.indexOf(username) !== -1) {
        console.log('second if')
        const position = upvoters.indexOf(username)
        upvoters.splice(position, 1);
        const finalString = upvoters.toString();

        db.Pins.update({
          score: (pin.dataValues.score - 1),
          upvoters: finalString,
          downvoters: newdv,
        }, {
          where: {
            id: req.body.id
          }
        })
      }
      else {
        console.log('hit')
      
        db.Pins.update({
          score: (pin.dataValues.score - 1),
          downvoters: newdv
        },
        { 
          where: {
          id: req.body.id
        }}
      ).then(info => console.log('hi'))
  
      }
    }).then(results => res.json(results))
    .catch(err => res.status(422).json(err));
  },
  upVote: (req, res) => {
    console.log(req.body)
    db.Pins.findOne({
      where: {
        id: req.body.id
      }
    }).then(pin => {

      console.log("doop")
      const username = req.body.username;
      const downvoters = pin.downvoters.split(',');
      const upvoters = pin.upvoters.split(',');
      const newuv = req.body.username + ',' + pin.upvoters
      const newdv = req.body.username + ',' + pin.downvoters
      console.log("woop")
      console.log(upvoters)
    

      if(upvoters.indexOf(username) !== -1) {
        console.log('first if')
        const position = upvoters.indexOf(username)
        upvoters.splice(position, 1);
        const finalString = upvoters.toString();
        console.log(finalString)
        db.Pins.update({
          score: (pin.dataValues.score - 1),
          upvoters: finalString
        }, { 
          where: {
          id: req.body.id
        }
      }).then(info => console.log('HI'))
    

      }
      else if (downvoters.indexOf(username) !== -1) {
        console.log('second if')
        const position = downvoters.indexOf(username)
        downvoters.splice(position, 1);
        const finalString = downvoters.toString();

        db.Pins.update({
          score: (pin.dataValues.score + 1),
          upvoters: newuv,
          downvoters: finalString,
        }, {
          where: {
            id: req.body.id
          }
        })
      }
      else {
        console.log('hit')
      
        db.Pins.update({
          score: (pin.dataValues.score + 1),
          upvoters: newuv
        },
        { 
          where: {
          id: req.body.id
        }}
      ).then(info => console.log('hi'))
  
      }
    }).then(results => res.json(results))
    .catch(err => res.status(422).json(err));
  },
  findAll: (req, res) => {
    db.Pins.findAll({
        where: {
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
    createPin: (req, res) => {
      console.log(req.body.username)
        db.Pins.create({
            username: req.body.username,
            title: req.body.title,
            category: req.body.category,
            coordinates: req.body.coordinates,
            description: req.body.description,
            score: 1 })
          .then(pin => res.json(pin))
          .catch(err => res.status(422).json(err));
        
    },
    getUserPins: (req, res) => {
      db.Pins.findAll({
        where: {
          username: req.params.username
        }
      })
      .then(pin => {
        if(!pin) {
          res.send("no user pins found")
        }
        else {
          console.log(pin)
          const userPins = pin
          res.send(userPins)
        }
      }).catch(res => console.log(res))
    },
    editUserPin: (req, res) => {
        db.Pins.update({
            description: req.body.description,
            category: req.body.category,
            title: req.body.title,
          }, {
            where: {
              username: req.body.username,
              id: req.body.id
            }
          })    
          .then(user => res.status(200).send({
            "code": 200
            
           }))
           .catch(err => res.status(422).json(err));
         },
         remove: function(req, res) {
          db.Pins.update({
              inactive: true
            }, {
              where: {
                username: req.params.username
              }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        }
    }


export { controller as default };