const express = require('express');
const router  = express.Router();//metodo de express que se encarga de devolver un objeto
const Task = require('../models/task');//constante donde traigo el eschema definido en /models/task osea los campos de la tabla analog a mysql
const passport = require('passport');

//routes//

//passport manejo de sesiones//

//pagina inicial//
router.get('/', (req, res, next)=>{
  res.render('signin',{
    //paso un arreglo tareas a la vista 
  });
});
//autenticación inicio de sesión/
router.post('/',passport.authenticate('local-signin',{
  successRedirect:'/cursos',
  failureRedirect:'/',
  passReqToCallback: true
}) );

//registro de nuevo usuario//
router.get('/signup', (req, res, next)=>{
res.render('signup',{});
});
//guardado de base de datos de nuevo usuario//
router.post('/signup', passport.authenticate('local-signup',{
  successRedirect:'/cursos',
  failureRedirect:'/',
  passReqToCallback: true
}));
//cierre de sesión
router.get('/logout',(req,res,next)=>{
  req.logout();
  res.redirect('/');
});
//autentificación y manejo de sessión 
function isAuthenticated(req,res,next) {
 if(req.isAuthenticated()){
   return next();
 }
 res.redirect('/');
};


//listado de cursos//
router.get('/cursos', isAuthenticated, async (req, res) => {//cuando pidan al servidor con un get yo respondo con res
  const tasks = await Task.find({name:"problem_graded",course:"Unicauca+LaTEX_Fish+2019-II"});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar   
  console.log(tasks)
  res.render('courses',{
    tasks//paso un arreglo tareas a la vista 
  });//desde aqui se envia la pagina respuesta cuando se tiene una petición get
}
);
//

//listado de examenes//
router.get('/cursos/:cursos',isAuthenticated, async (req,res)=>{
  const { cursos }= req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
  const task= await Task.find({name:"problem_check",course:"cursos"});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
  let subsection=[];
  let fecha=[];
  for(var i=0; i<tasks.length;i++){
    obtener=tasks[i].subsection;
    fechas=tasks[i].date;
    dates=fecha.push(fechas);
    ips=subsection.push(obtener);
     }
  var repetidos = [];
  var temporal = [];
  subsection.forEach((value,index)=>{
     temporal = Object.assign([],subsection); //Copiado de elemento
     temporal.splice(index,1); //Se elimina el elemnto q se compara
     /*** Se busca en temporal el elemento, y en repetido para * ver si esta ingresado al array. indexOf returna* -1 si el elemento no se encuetra**/
     if(temporal.indexOf(value)!=-1 && repetidos.indexOf(value)==-1)      repetidos.push(value);
     });
   /*  var Fecharepetidos = [];
     var Fechatemporal = [];
     fecha.forEach((value,index)=>{
        Fechatemporal = Object.assign([],fecha); //Copiado de elemento
        Fechatemporal.splice(index,1); //Se elimina el elemnto q se compara
        /*** Se busca en temporal el elemento, y en repetido para * ver si esta ingresado al array. indexOf returna* -1 si el elemento no se encuetra**/
      /*  if(Fechatemporal.indexOf(value)!=-1 && Fecharepetidos.indexOf(value)==-1)      Fecharepetidos.push(value);
        });  */
     /*console.log(repetidos); */ 
   /*  console.log(Fecharepetidos); */
  
  res.render('segunda',{
    task,cursos,repetidos //paso un arreglo tareas a la vista 
  });
}
);
//

//Examenes//
router.get('/seccion/:seccion',isAuthenticated, async (req,res)=>{
  const { seccion }= req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
  const tasks= await Task.find({"name":"problem_check","subsection":seccion});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
  res.render('opciones',{
    tasks,seccion //paso un arreglo tareas a la vista 
  });
}
);
//coincidencia botones
router.get('/coincidencia/:subseccion',isAuthenticated, async (req,res)=>{
const{subseccion}=req.params;
const tasks = await Task.find({"name":"problem_check","subsection":subseccion});
let arreglo_completo= [];
let consulta=tasks;
let arreglo_coincidencias1={'datos':[]};	
var objeto={};
for(i=0;i<tasks.length;i++){
  prueba = tasks[i].answers.split('&');
  arreglo_completo.push(prueba);
}	
for(var i=0; i<tasks.length; i++) { 
function validacion(){
    a=i+1
    coincidencias=[];
    arrayPredefinido = arreglo_completo[i];
     for (var j=0;j<tasks.length;j++) {
          b=j+1
          arrayUsuario = arreglo_completo[j];
          var contCoincidenciaValor = 0;
          var contCoincidenciaOrden = 0;
          var limite= arreglo_completo[1].length * 0.9 ;
           arrayPredefinido.forEach(function(elementoPredefinido, i) {
             arrayUsuario.forEach(function(elementoUsuario, j) {
              if (elementoPredefinido == elementoUsuario) {
                contCoincidenciaValor++;
                if (i == j) {
                  contCoincidenciaOrden++;
                  }
                   } 
                   });              
                   });
                mensaje= contCoincidenciaOrden;
                
                if ( a!=b && contCoincidenciaOrden>limite ){
              arreglo_coincidencias1.datos.push({
                  "estudiante1" : consulta[i].username,
                  "estudiante2": consulta[j].username,
									"coincidencias":contCoincidenciaOrden,
									"horaestudiante1":consulta[i].time,
									"horaestudiante2":consulta[j].time,
									"fecha":consulta[i].date,
									"dir_ip1":consulta[i].dir_ip,
									"dir_ip2":consulta[j].dir_ip,
									"link":consulta[i].page
                });
                
              }
               
                        }
      
    }
              validacion();
                    }
                    json = JSON.stringify(arreglo_coincidencias1);
                    var obj = JSON.parse(json);           


res.render('informe_coincidencia',{
 tasks,arreglo_completo,consulta,arreglo_coincidencias1,json,obj
});
});

//ip's botones
router.get('/subseccion/:subseccion',isAuthenticated, async (req,res)=>{
  const { subseccion }=req.params;
  const tasks= await Task.find({"name":"problem_check","subsection":subseccion});// aqui se busca los datos en la base de datos antes que se cargue la vista a mostrar
  let input_check = "";
  let ip= [];
  let respuesta=[];
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
router.get('/ipseccion/:dir_ip/:op',isAuthenticated, async(req,res) =>{
const {dir_ip} = req.params;
const {op}=req.params;
tasks = await Task.find({"dir_ip": dir_ip,"name":"problem_check","subsection":op});
consulta=tasks;
let arreglo_completo= [];
let arreglo_completo2= [];
let arreglo_completo3= [];

let arreglo_coincidencias1={'datos':[]};
for(i=0;i<tasks.length;i++){
  prueba = tasks[i].answers.split('&');
  arreglo_completo.push(prueba);
  
}
;
if(arreglo_completo[0].length>arreglo_completo[1].length){
  let tamaño= arreglo_completo[1].length;

for(var m=0;m<arreglo_completo.length;m++){
  let arreglo_completo2=[];
  for(var k=0; k<tamaño; k++) {
    answer_check=arreglo_completo[m][k].split('=');
     arreglo_completo2.push(answer_check[1]); 
     
      }
      arreglo_completo3.push(arreglo_completo2);
    }
   
for(var i=0; i<tasks.length; i++) { 
 
  function validacion(){
      a=i+1
      coincidencias=[];
      arrayPredefinido = arreglo_completo3[i];
     
       for (var j=0;j<tasks.length;j++) {
            b=j+1
            arrayUsuario = arreglo_completo3[j];
            var contCoincidenciaValor = 0;
            var contCoincidenciaOrden = 0;
            var limite= arreglo_completo[1].length * 0.2 ;
             arrayPredefinido.forEach(function(elementoPredefinido, i) {
         
               arrayUsuario.forEach(function(elementoUsuario, j) {
               
                if (elementoPredefinido == elementoUsuario) {
                  contCoincidenciaValor++;
                  if (i == j) {
                    
                    contCoincidenciaOrden++;
                    }
                     } 
                     });              
                     });
                  mensaje= contCoincidenciaOrden;
                  
                  if ( a!=b ){
                arreglo_coincidencias1.datos.push({
                    "estudiante1" : consulta[i].username,
                    "estudiante2": consulta[j].username,
                    "coincidencias":contCoincidenciaOrden,
                    "horaestudiante1":consulta[i].time,
                    "horaestudiante2":consulta[j].time,
                    "fecha":consulta[i].date,
                    "dir_ip1":consulta[i].dir_ip,
                    "dir_ip2":consulta[j].dir_ip,
                    "link":consulta[i].page
                  });
                  
                }
                 
                          }
        
      }
                validacion();
                      }
                      json = JSON.stringify(arreglo_coincidencias1);
                      var obj = JSON.parse(json); 
}
else{
  let tamaño= arreglo_completo[0].length;
for(var m=0;m<arreglo_completo.length;m++){
  let arreglo_completo2=[];
  for(var k=0; k<tamaño; k++) {
    answer_check=arreglo_completo[m][k].split('=');
     arreglo_completo2.push(answer_check[1]); 
     
      }
      arreglo_completo3.push(arreglo_completo2);
    }
   
for(var i=0; i<tasks.length; i++) { 
 
  function validacion(){
      a=i+1
      coincidencias=[];
      arrayPredefinido = arreglo_completo3[i];
     
       for (var j=0;j<tasks.length;j++) {
            b=j+1
            arrayUsuario = arreglo_completo3[j];
            var contCoincidenciaValor = 0;
            var contCoincidenciaOrden = 0;
            var limite= arreglo_completo[1].length * 0.2 ;
             arrayPredefinido.forEach(function(elementoPredefinido, i) {
         
               arrayUsuario.forEach(function(elementoUsuario, j) {
                
                if (elementoPredefinido == elementoUsuario) {
                  contCoincidenciaValor++;
                  if (i == j) {
                    
                    contCoincidenciaOrden++;
                    }
                     } 
                     });              
                     });
                  mensaje= contCoincidenciaOrden;
                  
                  if ( a!=b ){
                arreglo_coincidencias1.datos.push({
                    "estudiante1" : consulta[i].username,
                    "estudiante2": consulta[j].username,
                    "coincidencias":contCoincidenciaOrden,
                    "horaestudiante1":consulta[i].time,
                    "horaestudiante2":consulta[j].time,
                    "fecha":consulta[i].date,
                    "dir_ip1":consulta[i].dir_ip,
                    "dir_ip2":consulta[j].dir_ip,
                    "link":consulta[i].page
                  });
                  
                }
                 
                          }
        
      }
                validacion();
                      }
                      json = JSON.stringify(arreglo_coincidencias1);
                      var obj = JSON.parse(json); 
}

res.render('informe_ip',{
  consulta,obj//paso un arreglo tareas a la vista 
});
});



//hasta aqui va la tesis //
/*router.get('/delete/:id', async (req, res) => {//creacion de la ruta para que borre de la base de datos una tarea identificada por el _id unico en mongodb enviado desde el boton delete en index.ejs
  const { id }=req.params; //tomamos el parametro id que enviamos desde el botón delete en index.ejs
 await Task.remove({_id: id});//eliminar esa tarea (todas son sentencias de moongose)
 res.redirect('/');
});


router.post('/add', async (req, res) => {//creacion de la ruta ara que el formulario envie a esta misma los datos a almacenar en la base de datos
    
    const task = new Task(req.body);//aqui se crea el objeto que puedo almacenar en la base de datos
    await task.save();//con este comando se guarda en mongoDB
    res.redirect('/');//aqui de nuevo al directorio raiz del servidor para que se actualice despues de cada ingreso
}
);



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