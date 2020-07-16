; 
'use strict'

const Usuario = require('../modelos/Usuarios'), 
    Roles = require('../modelos/Roles'),
    fs = require('fs'),
    jwt = require('jsonwebtoken'),
    bcrypt  = require('bcrypt'),
    { ObjectId } = require('mongodb');

let getAll = (req, res) => {
    Usuario.find()
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: `Datos obtenidos correctamente ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: err
        })
    })
}

let getById = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.find({'_id': id})
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: `Datos obtenidos correctamente ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: err
        })
    })
}

let getByElement = async (req, res) => {
    let campos = req.query.campo
    let elemento = req.query.elemento

    Usuario.find({'nombre': elemento})
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: `Datos obtenidos corectamente ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: err
        })
    })
}

let insertData = async (req, res) => {
    let data = req.body.usuario
    
    if(!data.password && data.password == "")
    {
        return res.status(400).json({
           transaccion: false,
            msg: 'Campos vacios favor insertar datos.....'
        })
    } else {
        Usuario.create(data)
        .then(data => {
            let rol = {
                idUsuario: data._id,
                rol: req.body.rol,
                permission: req.body.permission
            }
        Roles.create(rol)
        .then(data => {
            res.status(200).json({
               transaccion: true,
                data,
                msg: 'Datos guardados correctamente......'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
    }
}

let insertDataMany = async (req, res) => {
    let arrayPersonas = req.body.data
    Usuario.insertMany(arrayPersonas)
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos guardados correctamente........'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateData = (req, res) => {
    let data = req.body
    Usuario.updateOne({'_id': new ObjectId(data.id) }, datas.datosActualizar)
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos actualizados correctamente...........'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let deleteData = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos actualizados correctamente............'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let loginUsuario = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(email == "" || password == "")
    {
        return res.status(400).send('Campos Vacios favor insertar datos')
    } else {
        Usuario.find({'email': email})
        .then(data => {
            if(bcrypt.compareSync(password, data[0].password)){
                let token = jwt.sign({data: data}, process.env.KEY_JWT, 
                    {algorithm: 'HS256', expiresIn: 60000})
                return res.status(200).json({
                   transaccion: true,
                    token,
                    msg: 'Usuario Logueado'
                })
            } else {
                return res.status(400).json({
                   transaccion: true,
                    data: null,
                    msg: 'Datos incorectos favor insertar nuevamente'
                })
            }
        })
        .catch(err =>{
            return res.status(400).json({
               transaccion: false,
                data: null,
                msg: 'Email incorrecto inserte nuevamente'
            })
        })
    }
}

module.exports = {
    getAll,
    insertDataMany,
    insertData,
    updateData,
    getById,
    getByElement,
    deleteData,
    loginUsuario
}