const express = require('express');
const router  = express.Router();//metodo de express que se encarga de devolver un objeto

router.get('/',(req, res) => {//cuando pidan al servidor con un get yo respondo con res
    res.render('index');//desde aqui se envia la pagina respuesta cuando se tiene una petición get
    
}
);


module.exports = router;//exporta el objeto enrutador 