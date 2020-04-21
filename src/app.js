const express = require('express');//importa el modulo express
const app = express();// inicializar express en la constante app
const path = require('path');//modulo que se encarga de unir directorios dependiendo del sistema operativo
const morgan = require('morgan');//importa el modulo morgan
const mongoose = require('mongoose');//importa el módulo mongoose 


//conexión a la base de datos
mongoose.connect('mongodb://localhost/estrategias_evaluativas')//conectar desde el modulo mongoose con mongo DB
 .then(db => console.log('conexión exitosa')) //mensajes de conexión (promesa de conexión)
 .catch(err => console.log(err));

//importing routes
const IndexRoutes= require('./routes/index');//importa el objeto que contiene las rutas en routes/index.js

//settings
app.set('port', process.env.PORT || 3000);//asignación del puerto de escucha
app.set('views', path.join(__dirname, 'views'));//le enseña donde buscar la carpeta de las vistas al servidor 
//app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');//configura el motor de plantilla a usar en nuestro servidor 

//middlewares//funcion que se ejecuta antes de que lleguen a las rutas del servidor
app.use(morgan('dev'));//muestra las peticiones en consola antes de que lleguen al servidor//importante para ver que esta pasando en segundo plano y corregir errores.
app.use(express.urlencoded({extended: false}));//metodo que se encarga de poder entender los datos que envia el cliente desde el browser a el servidor, el extend false es porque solo se recibe texto
app.use(express.static(path.join(__dirname, 'views/css')));//aqui busca en esa ruta la carpeta css __dirname es el path de la carpeta definida como fuente o root en este caso src
app.use(express.static(path.join(__dirname, 'views/js')));//aqui busca en esa ruta la carpeta js __dirname es el path de la carpeta definida como fuente o root en este caso src
app.use(express.static(path.join(__dirname, 'views/media')));//aqui busca en esa ruta la carpeta media, __dirname es el path de la carpeta definida como fuente o root en este caso src


//routes
app.use("/", IndexRoutes);//indica que cuando la app necesita una ruta use el objeto indexroute que es el router traido de /routes/index.js


//starting the server
app.listen(app.get('port'), () =>{ 
    console.log(`servidor listo en puerto ${app.get('port')}`);
});

