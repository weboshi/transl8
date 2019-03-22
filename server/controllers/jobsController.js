const db = require("../models");


const controller = {
  downVote: (req, res) => {
    console.log(req.body)
    db.Jobs.findOne({
      where: {
        id: req.body.id
      }
    }).then(job => {

      const username = req.body.username;

      const downvoters = job.downvoters.split(',');

      const upvoters = job.upvoters.split(',');

    
      const newuv = req.body.username + job.downvoters
      const newdv = req.body.username + ',' + job.downvoters
    

      if(downvoters.indexOf(username) !== -1) {
        console.log('first if')
        const position = downvoters.indexOf(username)
        downvoters.splice(position, 1);
        const finalString = downvoters.toString();
        console.log(finalString)
        db.Jobs.update({
          score: (job.dataValues.score + 1),
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

        db.Jobs.update({
          score: (job.dataValues.score - 1),
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
      
        db.Jobs.update({
          score: (job.dataValues.score - 1),
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
    db.Jobs.findOne({
      where: {
        id: req.body.id
      }
    }).then(job => {

      console.log("doop")
      const username = req.body.username;
      const downvoters = job.downvoters.split(',');
      const upvoters = job.upvoters.split(',');
      const newuv = req.body.username + ',' + job.upvoters
      const newdv = req.body.username + ',' + job.downvoters
      console.log("woop")
      console.log(upvoters)
    

      if(upvoters.indexOf(username) !== -1) {
        console.log('first if')
        const position = upvoters.indexOf(username)
        upvoters.splice(position, 1);
        const finalString = upvoters.toString();
        console.log(finalString)
        db.Jobs.update({
          score: (job.dataValues.score - 1),
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

        db.Jobs.update({
          score: (job.dataValues.score + 1),
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
      
        db.Jobs.update({
          score: (job.dataValues.score + 1),
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
  findId: (req, res) => {
    console.log(req)
    db.Jobs.findOne({
      where: {
        inactive: false,
        id: req.params.id,
      }
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
  },
  findAll: (req, res) => {
    db.Jobs.findAll({
        where: {
          inactive: false
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getBookmarks: (req, res) => {
    let bookmarks = req.query.bookmarks
    console.log(req.query.bookmarks)
    db.Jobs.findAll({
        where: {
          id: {
            [db.Sequelize.Op.or]: req.query.bookmarks
          },
        }
      })
      .then(bookmarks => res.send(bookmarks)
      )
      .catch(err => res.status(422).json(err));
  },
    createJob: (req, res) => {
      console.log(req.body)
        db.Jobs.create({
            username: req.body.username,
            title: req.body.title,
            category: req.body.category,
            languageTo: req.body.languageTo,
            languageFrom: req.body.languageFrom,
            description: req.body.description,
            price: req.body.price,
            score: 1 })
          .then(job => res.json(job))
          .catch(err => res.status(422).json(err));
        
    },
    getUserJobs: (req, res) => {
      db.Jobs.findAll({
        where: {
          username: req.params.username
        }
      })
      .then(job => {
        if(!job) {
          res.send("no user Jobs found")
        }
        else {
          console.log(job)
          const userJobs = job
          res.send(userJobs)
        }
      }).catch(res => console.log(res))
    },
    editUserjob: (req, res) => {
        db.Jobs.update({
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
          db.Jobs.update({
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