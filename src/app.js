require('dotenv').config();
const express = require('express');//importa el modulo express
const app = express();// inicializar express en la constante app
const path = require('path');//modulo que se encarga de unir directorios dependiendo del sistema operativo
const morgan = require('morgan');//importa el modulo morgan
const mongoose = require('mongoose');//importa el módulo mongoose 
const passport = require('passport');
const session = require('express-session');
const flash= require('connect-flash');
const usr_db= process.env.USER_DB;
const pass_db=process.env.PASS_DB;
const mongo_uri=process.env.MONGO_URI;
require('./passport/local-auth');

 
//conexión a la base de datos
//mongoose.connect(mongo_uri,{ useNewUrlParser: true,useUnifiedTopology: true })//conectar desde el modulo mongoose con mongo DB
mongoose.connect('mongodb+srv://javierc:0FPgnzYFQvjAiWpt@detectapp.8somp.mongodb.net/EstrategiasEvaluativas2',{ useNewUrlParser: true,useUnifiedTopology: true })
//mongoose.connect('mongodb://localhost/EstrategiasEvaluativas2',{ useNewUrlParser: true,useUnifiedTopology: true })//conectar desde el modulo mongoose con mongo DB
.then(db => console.log('conexión exitosa')) //mensajes de conexión (promesa de conexión)
.catch(err => console.log(err));


 
//importing routes
const IndexRoutes= require('./routes/index');//importa el objeto que contiene las rutas en routes/index.js

//settings
app.set('port', process.env.PORT || process.env.PORT_USER);//asignación del puerto de escucha
app.set('views', path.join(__dirname, 'views'));//le enseña donde buscar la carpeta de las vistas al servidor 
//app.set('public', path.join(__dirname, 'public/css'));
app.set('view engine', 'ejs');//configura el motor de plantilla a usar en nuestro servidor 
app.use(session({
    secret:'mpoc',
    resave:false,
    saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    app.locals.signupMessageemail = req.flash('signupMessageemail');
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.failpassword = req.flash('failpassword');
    next();
});
//app.use('/static', express.static('public'));
//middlewares//funcion que se ejecuta antes de que lleguen a las rutas del servidor
app.use(morgan('dev'));//muestra las peticiones en consola antes de que lleguen al servidor//importante para ver que esta pasando en segundo plano y corregir errores.
app.use(express.urlencoded({extended: false}));//metodo que se encarga de poder entender los datos que envia el cliente desde el browser a el servidor, el extend false es porque solo se recibe texto
app.use('/static', express.static(__dirname + '/public'));

//routes
app.use("/", IndexRoutes);//indica que cuando la app necesita una ruta use el objeto indexroute que es el router traido de /routes/index.js


//starting the server
app.listen(app.get('port'), () =>{ 
    console.log(`servidor listo en puerto ${app.get('port')}`);
});

