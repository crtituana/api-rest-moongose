;
'use strict'

const mongoose = require('mongoose'),

      { Schema } = mongoose,

      FileModel = new Schema(
          {
              nombre: {type: String}
          }
      );

module.exports = mongoose.model('Archivos', FileModel, 'archivos')
