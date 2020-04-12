const express = require('express');
const cors = require('cors');
const server = express();
let controladorCompetencias = require('./controladores/competenciasController');


server.use(cors());
server.use(express.json());

//Ruta para obtener competencias
server.get('/competencias', controladorCompetencias.getAllCompetencias);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
