;
'use stric'

const  Estudiante  = require('../modelos/Estudiantes'), 
       path        = require('path'),
       { ObjectId } = require('mongodb'),
       fs          = require('fs'),
       { unlink }  = require('fs')

let getAll = (req, res) => {
    Estudiante.find()
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
    Estudiante.find({'_id': id})
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

    Estudiante.find({'nombre': elemento})
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

let insertData = async (req, res) => {
    let data = req.body.usuario
    
    if(!data.password && data.password == "")
    {
        return res.status(400).json({
           transaccion: false,
            msg: 'Campos vacios por favor debe ingresar datos...............'
        })
    } else {
        Estudiante.create(data)
        .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos guardados correctamente.........'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: ` ${err}`
        })
    })
    }
}

let insertDataMany = async (req, res) => {
    let arrayPersonas = req.body.data
    Estudiante.insertMany(arrayPersonas)
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos guardados correctamente................'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: `${err}`
        })
    })
}

let updateData = (req, res) => {
    let data = req.body
    Estudiante.updateOne({'_id': new ObjectId(data.id) }, data.datosActualizar)
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos actualizados correctamente.....................'
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
    Estudiante.deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
           transaccion: true,
            data,
            msg: 'Datos actualizados correctamente.....................'
        })
    })
    .catch(err => {
        res.status(500).json({
           transaccion: false,
            data: null,
            msg: ` ${err}`
        })
    })
}

module.exports = {
    getAll,
    getById,
    getByElement,
    insertData,
    insertDataMany,
    updateData,
    deleteData
}