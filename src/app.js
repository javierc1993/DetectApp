const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
//conexión a la base de datos

mongoose.connect('mongodb://localhost/crud-mongo')
 .then(db => console.log('conexión exitosa'))
 .catch(err => console.log(err));

//importing routes
const IndexRoutes= require('./routes/index');
//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
//app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

//middlewares//funcion que se ejecuta antes de que lleguen a las rutas del servidor
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
//app.use(express.static('src/public'));
//app.use('/src', express.static('css'));
app.use(express.static(path.join(__dirname, 'views/css')));
app.use(express.static(path.join(__dirname, 'views/js')));
app.use(express.static(path.join(__dirname, 'views/media')));
//routes
app.use("/", IndexRoutes);


//starting the server
app.listen(app.get('port'), () =>{ 
    console.log(`servidor listo en puerto ${app.get('port')}`);
});

