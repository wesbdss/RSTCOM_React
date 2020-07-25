const express = require('express')
const authController = require('./controllers/auth-controller')
const userController = require('./controllers/user-controller')
const multer = require('multer')
const config = require('./config/multer_conf.js')


const route = express()

// Rotas de Login e de Registro
route.post('/login', authController.login)
route.post('/register', authController.register)

//Rota de acesso a uma Imagem Armazenada na Aplicação
route.get('/photo/:id',userController.image_find)
//Retorna todos os usuários registrados
// route.get('/users', userController.index)

//retornar um usuários específico
route.post('/users', userController.show)

//Faz update dos dados sem alteração da imagem de perfil
route.post('/update', userController.update)

//Faz update dos todolists do usuário
route.post('/todo', userController.updateTodo)

//Faz update dos dados com alteração da imagem de perfil
route.post('/profile', multer(config).single('photo'), userController.image_profile)




module.exports = route