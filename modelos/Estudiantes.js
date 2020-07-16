;
'use strict'

const mongoose = require('mongoose'),
      { Schema } = mongoose,

      EstudianteModel = new Schema(
          {
              nombre: {type: String},
              apellido: {type: String},
              direccion: {type: String},
              edad: {type: String},
              foto: {type: String}
          }
      );

module.exports = mongoose.model('Estudiantes', EstudianteModel, 'Estudiantes')
