const express = require('express');
const cors = require('cors');
const server = express();
let controladorCompetencias = require('./controladores/competenciasController');
let controladorPeliculas = require('./controladores/controladorPeliculas');


server.use(cors());
server.use(express.json());

//Ruta para obtener competencias
server.get('/competencias', controladorCompetencias.getAllCompetencias);
//Ruta para obtener películas para votar
server.get('/competencias/:id/peliculas',controladorPeliculas.getObtenerPeliculas);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
