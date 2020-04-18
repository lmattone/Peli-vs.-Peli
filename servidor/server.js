const express = require('express');
const cors = require('cors');
const server = express();
let controladorCompetencias = require('./controladores/competenciasController');
let controladorPeliculas = require('./controladores/controladorPeliculas');
let controladorVotos = require('./controladores/controladorVotos');
let controladorResultados = require('./controladores/controladorResultados')


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Ruta para obtener competencias
server.get('/competencias', controladorCompetencias.getAllCompetencias);
//Ruta para obtener películas para votar
server.get('/competencias/:id/peliculas', controladorPeliculas.getObtenerPeliculas);
//Ruta para votar
server.post('/competencias/:id/voto', controladorVotos.postObtenerVotos);
//Ruta para obtener las 3 películas más votadas
server.get('/competencias/:id/resultados', controladorResultados.getResultados);


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
