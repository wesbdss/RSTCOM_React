const database = require('../config/database')

const authController = {
  login: (req, res) => {
    const { email, pass } = req.body
    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .findOne({ email })
        .then(response => {

          if (response && response.pass == pass ) {
            res.send(response)
          }else{
            res.send(null)
          }
            

          db.close()
        })
    })
  },

  register: (req, res) => {
    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')
      const {email} = req.body
      if (req.body.email && req.body.name && req.body.pass) {
        dbo.collection('users').findOne({email}).then(response=>{
          if(response.email == email ){
            res.status(404).json({ message: 'Email Já registrado.',})
          }
        })
        dbo
          .collection('users')
          .insertOne(req.body)
          .then(() => {
            res.sendStatus(200)
            db.close()
          })
      } else {
        res.send(null)
      }
    })
  },
}

module.exports = authController
