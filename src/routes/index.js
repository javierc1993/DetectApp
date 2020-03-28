const express = require('express');
const router  = express.Router();//metodo de express que se encarga de devolver un objeto
const Task = require('../models/task');//constante donde traigo el eschema definido en /models/task osea los campos de la tabla analog a mysql
router.get('/', async (req, res) => {//cuando pidan al servidor con un get yo respondo con res
    
    const tasks = await Task.find();// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
    res.render('index',{
      tasks //paso un arreglo tareas a la vista 
    });//desde aqui se envia la pagina respuesta cuando se tiene una petición get
}
);

router.post('/add', async (req, res) => {//creacion de la ruta ara que el formulario envie a esta misma los datos a almacenar en la base de datos
    
    const task = new Task(req.body);//aqui se crea el objeto que puedo almacenar en la base de datos
    await task.save();//con este comando se guarda en mongoDB
    res.redirect('/');//aqui de nuevo al directorio raiz del servidor para que se actualice despues de cada ingreso
}
);

router.get('/delete/:id', async (req, res) => {//creacion de la ruta para que borre de la base de datos una tarea identificada por el _id unico en mongodb enviado desde el boton delete en index.ejs
    const { id }=req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
   await Task.remove({_id: id});//eliminar esa tarea (todas son sentencias de moongose)
   res.redirect('/');
});

router.get('/turn/:id', async (req,res)=>{
    const { id }=req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
    const task = await Task.findById(id); //busco la tarea con ese id
    task.status = !task.status; //guardo esa tarea y la cambio de falso a verdadero y viceversa
    await task.save(); //guardamos ese cambio
    res.redirect('/');
});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req,res)=>{
   const { id}= req.params;
   await Task.update({_id: id}, req.body);
   res.redirect('/');
});

module.exports = router;//exporta el objeto enrutador 