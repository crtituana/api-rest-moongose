;
'use strict'

const mongoose = require('mongoose'),
      { Schema } = mongoose,

      RolModel = new Schema(
          {
              idUsuario: {type: String},
              rol: {type: String},
              permisos: {type: Array}
          }
      );

module.exports = mongoose.model('Roles', RolModel, 'Roles')