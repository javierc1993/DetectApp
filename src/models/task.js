//esquema de como va a lucir las tablas de la base de datos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//propiedad que nos permite definir como van a lucir los datos

const TaskSchema= new Schema({ //aqui van los campos que tendra cada tarea "columnas de las tablas"
   
    username: String,
    dir_ip: String,
    answers: String,
    course: String,
    session: String,
    date: String,
    unit: String,
    name: String,
    section: String,
    subsection: String,
    time: String,
    page: String
});
module.exports = mongoose.model('cursosmpoc', TaskSchema); //aqui exporto el esquema a un metodo de moongose llamado model para que tome ese esquema y utilizarlo para guardar datos en una colección de objtos llamada task 