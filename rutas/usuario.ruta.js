;
'use strict'
const express = require('express');

let authMiddleware = require('../controles/middleware/auth'),
    passwordMiddleware = require('../controles/middleware/password'),
    permisosMiddleware = require('../controles/middleware/permisos')

let api = express.Router(),
    usuarioControl = require('../controles/usuarios.control');

api.get('/get_Users', [authMiddleware.autentica], usuarioControl.getAll)
api.post('/insertMany', [authMiddleware.autentica], usuarioControl.insertDataMany)
api.post('/insertOne', [authMiddleware.autentica, passwordMiddleware.codificarPassword], usuarioControl.insertData)
api.put('/updateOne', [authMiddleware.autentica], usuarioControl.updateData)
api.get('/findOne', [authMiddleware.autentica], usuarioControl.getById)
api.get('/findElement', [authMiddleware.autentica], usuarioControl.getByElement)
api.delete('/deleteElement', [authMiddleware.autentica], usuarioControl.deleteData)
api.post('/login', usuarioControl.loginUsuario)

module.exports = api;
