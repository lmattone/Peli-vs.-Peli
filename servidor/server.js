const express = require('express');
const cors = require('cors');
const server = express();
let controladorCompetencias = require('./controladores/competenciasController');
let controladorPeliculas = require('./controladores/controladorPeliculas');
let controladorVotos = require('./controladores/controladorVotos');


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Ruta para obtener competencias
server.get('/competencias', controladorCompetencias.getAllCompetencias);
//Ruta para obtener películas para votar
server.get('/competencias/:id/peliculas', controladorPeliculas.getObtenerPeliculas);
//Ruta para contabilizar los votos
server.post('/competencias/:id/voto', controladorVotos.postObtenerVotos);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
