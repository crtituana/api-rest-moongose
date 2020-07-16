;
'use strict'
const express = require('express');

let authMiddleware = require('../controles/middleware/auth'),
    permisosMiddleware = require('../controles/middleware/permisos')
    filesMiddleware = require('../controles/middleware/file'),
    multiparty = require('connect-multiparty')

let api = express.Router(),
    estudianteControl = require('../controles/estudiante.Control');

api.get('/get_estudiante', [authMiddleware.autentica], estudianteControl.getAll)
api.post('/insert_estudiante', [authMiddleware.autentica], estudianteControl.insertDataMany)
api.post('/insert_foto', [authMiddleware.autentica, multiparty('../files/galeria')], estudianteControl.insertData)
api.put('/update_estudiante', [authMiddleware.autentica], estudianteControl.updateData)
api.get('/find_estudiante', [authMiddleware.autentica], estudianteControl.getById)
api.get('/find_estudiante_Element', [authMiddleware.autentica], estudianteControl.getByElement)
api.delete('/delete_estudiante', [authMiddleware.autentica], estudianteControl.deleteData)

module.exports = api;