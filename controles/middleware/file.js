; 
'use strict'

const fs = require('fs'),
    path = require('path'),
    { ObjectId } = require('mongodb');

let uploadData = async (req,res, next) => {
    let file = req.files.file

    if(file.originalFilename == "" || !file.originalFilename)
    {
        fs.unlinkSync(file.path)
        return res.status(400).json({
           transaccion: false,
            data: null,
            msg: 'Error al cargar el archivo'
        })
    }
    else {
        let url = file.path;
            url = url.split('\\');
        let urlFiles = [{'nombre': url[url.length -1]}];

        req.files.file = urlFiles;
        next();
    }
}

let verFile = (req, res) => {
    let urlFile = req.params.urlFile
    let pathfile = `./files/galeria/${urlFile}`
    fs.exists(pathfile, (exists)  => {

        if(exists) {
            return res.status(200).sendFile(path.resolve(pathfile))
        }else {
            return res.status(400).send('No existe')
        }
    })
}

let updateFile = async (req, res) => {
    let file = req.files.file,
        id = new ObjectId(req.body.id)

    if(file.originalFilename == "" || !file.originalFilename)
    {
        fs.unlinkSync(file.path)
        return res.status(400).json({
           transaccion: false,
            data: null,
            msg: 'Error al cargar el archivo'
        })
        
    }
    else {
        let url = file.path;
            url = url.split('\\');
        let urlFile = url[url.length -1];
        Files.findOneAndUpdate({'_id': id}, {'nombre': urlFile })
        .then(data =>{
            fs.unlinkSync(`files/galeria/${data.nombre}`)
            return res.status(200).json({
               transaccion: true,
                data,
                msg: 'Archivo actualizado corectamente......'
            })
        })
        .catch(err => {
            return res.status(400).json({
               transaccion: false,
                data: null,
                msg: err
            })
        })
    }
}

let deleteFile = async (req, res) => {
    let id = new ObjectId(req.query.id)
        Files.findOneAndDelete({'_id': id})
        .then(data =>{
            fs.unlinkSync(`files/galeria/${data.nombre}`)
            return res.status(200).json({
               transaccion: true,
                data,
                msg: 'Archivo eliminado correctamente .....'
            })
        })
        .catch(err => {
            return res.status(400).json({
               transaccion: false,
                data: null,
                msg: err
            })
        })
}

module.exports = {
    uploadData,
    verFile,
    updateFile,
    deleteFile
} 