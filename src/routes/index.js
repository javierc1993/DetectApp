const express = require('express');
const router  = express.Router();//metodo de express que se encarga de devolver un objeto
const Task = require('../models/task');//constante donde traigo el eschema definido en /models/task osea los campos de la tabla analog a mysql


//routes//

//inicio//
router.get('/', async (req, res) => {//cuando pidan al servidor con un get yo respondo con res
    let input_check = [];
    let raros = [];
    let respuesta=[];
    const tasks = await Task.find({"name":"problem_check","course" : "Unicauca+LeanStartUp+2019-II"});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
    for(var i=0; i<tasks.length;i++){
      input_check = tasks[i].answers.split('&');
       for(var j=0; j<input_check.length; j++) {
         answer_check=input_check[j].split('=');
         respuestas = respuesta.push(answer_check);
         
        };
      
    };
    
    res.render('index',{
      tasks,respuesta//paso un arreglo tareas a la vista 
    });//desde aqui se envia la pagina respuesta cuando se tiene una petición get
}
);

//cuestionarios
//modulo 2 unidad tematica 2//supletorio


//Modulo 3 unidad tematica 2//examen pcpal
router.get('/seccion/:seccion', async (req,res)=>{
  const { seccion }= req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
  const tasks= await Task.find({"name":"problem_graded","subsection":seccion});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
  res.render('opciones',{
    tasks,seccion //paso un arreglo tareas a la vista 
  });
}
);


//ip's botones
router.get('/subseccion/:subseccion', async (req,res)=>{
  const { subseccion }=req.params;
  const tasks= await Task.find({"name":"problem_graded","subsection":subseccion});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
  let input_check = "";
  let ip= [];
  let respuesta=[];
  let tamaño = tasks.length;
  for(var i=0; i<tasks.length;i++){
     obtener=tasks[i].dir_ip;
     ips=ip.push(obtener);
      }
let consulta = [];
var repetidos = [];
var temporal = [];
ip.forEach((value,index)=>{
temporal = Object.assign([],ip); //Copiado de elemento
temporal.splice(index,1); //Se elimina el elemnto q se compara
/*** Se busca en temporal el elemento, y en repetido para * ver si esta ingresado al array. indexOf returna* -1 si el elemento no se encuetra**/
if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1)      repetidos.push(value);
});
      res.render('ips',{
        tasks,respuesta,input_check,consulta,repetidos,subseccion //paso un arreglo tareas a la vista 
      }); 
});
//muestra los alumnos con x ip identica
router.get('/ipseccion/:dir_ip/:op', async(req,res) =>{
const {dir_ip} = req.params;
const {op}=req.params;
consulta = await Task.find({"dir_ip": dir_ip,"name":"problem_graded","subsection":op});
res.render('informe_ip',{
  consulta //paso un arreglo tareas a la vista 
});
});
//hasta aqui va la tesis //
/*
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
    const tasks= await tasks.findByIp
    res.render('edit', {
        task
    });
});

router.post('/edit/:id', async (req,res)=>{
   const { id}= req.params;
   await Task.update({_id: id}, req.body);
   res.redirect('/');
});

*/


module.exports = router;//exporta el objeto enrutador 