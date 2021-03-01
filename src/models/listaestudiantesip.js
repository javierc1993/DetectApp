//esquema de como va a lucir las tablas de la base de datos.
const mongoose = require('mongoose');
const EstudianteSchema = mongoose.Schema;//propiedad que nos permite definir como van a lucir los datos

const EstudiantesCoincidenciaIPSchema= new EstudianteSchema({ //aqui van los campos que tendra cada tarea "columnas de las tablas"
   nombre: String,
   subsection: String,
   ip: String

});
module.exports = mongoose.model('ListaEstudiantesip', EstudiantesCoincidenciaIPSchema); //aqui exporto el esquema a un metodo de moongose llamado model para que tome ese esquema y utilizarlo para guardar datos en una colección de objtos llamada task 