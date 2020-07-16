; 
'use strict'

const bcrypt =  require('bcrypt'),
      connectDb = require('../../config/db');

let codificarPassword = (req, res, next) => {
    let usuario = req.body.usuario || null

    if(!usuario || usuario.password == "" || !usuario.password)
    {
        return res.status(400).send('Usuario o contraseña invalidos');
    } else {
        let codificarPassword = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        if(codificarPassword)
        {
            req.body.usuario.password = codificarPassword
            req.body.usuario.createAt = new Date();
            if(req.sessionID){
                req.body.usuario.sessionID = req.sessionID
                next();
            }
            else{
               return res.status(400).send('No se encontro una sesion valida') 
            }
        }
        else {
            return res.status(400).send('El password no se pudo procesar!! Clave incorrecta')
        }
    }
}

let PermissionsByRole = async (req, res, next) => {
    let db = await connectDb(),
        usuario = req.body.usuario

    if(!usuario || usuario.password == "" || !usuario.password)
    {
        return res.status(400).send('Usuario o contraseña no valido');
    } else {

    }
}

module.exports = {
    codificarPassword
}