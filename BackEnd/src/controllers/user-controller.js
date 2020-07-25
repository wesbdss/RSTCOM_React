const { ObjectId } = require('mongodb')
const database = require('../config/database')
const path = require('path')
const destination = path.resolve(__dirname, '..', '..', 'uploads')

const userController = {
  index: (req, res) => {
    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .find()
        .toArray()
        .then(response => {
          res.json(response)

          db.close()
        })
    })
  },

  show: (req, res) => {
    const { id } = req.body

    database((err, db) => {
      if (err) throw err

      const dbo = db.db('mydb')

      dbo
        .collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          response
            ? res.json(response)
            : res.status(404).json({
              message: 'User not found.',
            })

          db.close()
        })
    })
  },

  update: (req, res) => {
    const { id, name, email, pass } = req.body
    database((err, db) => {
      if (err) throw err
      const dbo = db.db('mydb')
      dbo.collection('users').findOne({ email }).then(response => {
        if (response.email == email && id != response._id) {
          res.status(404).json({ message: 'Email Já registrado.', })
        }
      })
      dbo.collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          if (!response) res.status(404).json({ message: 'User not found.', })
        });
      dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $set: { name: name, email: email, pass: pass } }, function (err, resp) {
        if (err) throw err;
        console.log('update: ' + id)
      });
      dbo.collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          if (!response) res.status(404).json({ message: 'User not found.', })
          res.json(response)
          db.close();
        });


    })
  },
  image_profile: (req, res) => {
    //Alterar a foto do usuário de forma separada
    console.log(req.file.filename)
    const { id, name, email, pass } = req.body

    database((err, db) => {
      if (err) throw err
      const dbo = db.db('mydb')
      dbo.collection('users').findOne({ email }).then(response => {
        if (response.email == email) {
          res.status(404).json({ message: 'Email Já registrado.', })
        }
      })
      dbo.collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          if (!response) res.status(404).json({ message: 'User not found.', })
        });

      dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $set: { photo: req.file.filename } }, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
      });
      dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $set: { name: name, email: email, pass: pass } }, function (err, resp) {
        if (err) throw err;
        console.log('update: ' + id)
      });
      dbo.collection('users')
        .findOne({ _id: ObjectId(id) })
        .then(response => {
          if (!response) res.status(404).json({ message: 'User not found.', })
          res.json(response)
          db.close()
        });
    })

  },
  image_find: (req, res) => {
    const { id } = req.params
    res.contentType('image/jpeg');
    res.sendFile(destination + '/' + id)
  },
  updateTodo: (req, res) => {
    const { id, func, todo } = req.body

    database((err, db) => {
      if (err) throw err
      const dbo = db.db('mydb')

      if (func === 'add') {
        console.log(todo)
        dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $push: { todo: todo } }, function (err, res) {
          if (err) throw err;
          console.log("Todolist Adicionada por " + id);
        });
        res.status(200).json({ message: "Adicionado" })


      } else if (func == 'change') {
        dbo.collection("users").updateOne({ _id: ObjectId(id) }, { $set: { todo: todo } }, function (err, resp) {
          if (err) throw err;
          console.log("Todolist Removida por " + id);
          res.status(200).json({ message: "settado" })
        })
        
        db.close()
      }

    })

  }
}

module.exports = userController
