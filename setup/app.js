; 
'use strict';

const express = require('express'),
      bodyParse = require('body-parser'),
      connectDb = require('../config/db'),
      passport = require('passport'),
      cors = require('cors'),
      parseurl = require('parseurl');

let session = require('express-session')
    app = express(),
    usuarioRuta = require('../rutas/usuario.ruta'),
    estudianteRuta = require('../rutas/estudiantes.ruta'),
    db = connectDb(),
    sess = {
        secret: process.env.KEY_SESSION,
        resave: false,
        saveUninitialized: true,
        name: 'sessionID',
        cookie: {
            httpOnly: false,
            naxAge: parseInt(process.env.TIEMPO)
        }  
    },
    corsOptions = {
        origin: 'http://localhost:4200',
        optionsSuccessStatus: 200
    }

app.use(bodyParse.urlencoded({
    extended: false
}));

//CORS
app.use(cors(corsOptions));

//SESSION
app.use(session(sess));

//PASSPORT
app.use(passport.initialize());
app.use(passport.session())

//ejemplo de config
app.use((req, res, next) => {
    if(!req.session.views){
        req.session.views = {}
    }
    let pathname = parseurl(req).pathname
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    next() 
})

app.use(bodyParse.json());

app.use('/api', usuarioRuta)
app.use('/api', estudianteRuta)

module.exports = app;