;
'use strict'

const jwt = require('jsonwebtoken');
const cache = require('memory-cache')

let verification = (req, res ,next) =>  {
   let key = Object.keys(req.session.views)
   let path= key[0].split('/')
   let pathName = path[path.length -1]
   let rol = cache.get( 'passw' );
    rol.forEach(element => {
        if(element == pathName)
        {
            next()
        }
        else{
            return res.status(400).send('No se puede acceder .....!! Acceso Denegado')
        }
    });
}


module.exports = {
    verification
}
