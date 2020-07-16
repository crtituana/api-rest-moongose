;
'use strict'

const mongoose = require('mongoose'),
      { Schema } = mongoose,

      UsuarioModel = new Schema(
          {
              nombre: {type: String},
              apellido: {type: String},
              email: {type: String},
              password: {type: String}
          }
      );

module.exports = mongoose.model('Usuarios', UsuarioModel, 'Usuarios')
