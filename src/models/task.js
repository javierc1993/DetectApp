//esquema de como va a lucir las tablas de la base de datos.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;//propiedad que nos permite definir como van a lucir los datos

const TaskSchema= new Schema({ //aqui van los campos que tendra cada tarea "columnas de las tablas"
    title: String,  //aqui la forma va clave:valor , clave es el nombre del campo y valor ps el tipo de valor
    description: String,
    status:{ //aqui en lugar de ponerle un valor le pongo un objeto para ue arranque el satus siempre en false
        type: Boolean,
        default: false
    }

});
module.exports = mongoose.model('tasks', TaskSchema); //aqui exporto el esquema a un metodo de moongose llamado model para que tome ese esquema y utilizarlo para guardar datos en una colección de objtos llamada task 