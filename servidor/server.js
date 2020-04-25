const express = require('express');
const cors = require('cors');
const server = express();
let controladorCompetencias = require('./controladores/competenciasController');
let controladorPeliculas = require('./controladores/controladorPeliculas');
let controladorVotos = require('./controladores/controladorVotos');
let controladorResultados = require('./controladores/controladorResultados');
let controladorNuevaCompetencia = require('./controladores/controladorNuevaCompetencia');
let controladorEliminarVotos = require ('./controladores/controladorEliminarVotos');
let controladorGeneros = require('./controladores/controladorGeneros');
let controladorDirectores = require('./controladores/controladorDirectores');
let controladorActores = require('./controladores/controladorActores');
let controladorEliminarCompetencias = require('./controladores/controladorEliminarCompetencia');
let controladorEditarCompetencias = require('./controladores/controladorEditarCompetencias');
let controladorCompetencia = require('./controladores/controladorCompetencia');


server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Ruta para obtener competencias
server.get('/competencias', controladorCompetencias.getAllCompetencias);
//Ruta para obtener una competencia
server.get('/competencias/:id', controladorCompetencia.getCompetencia);
//Ruta para obtener películas para votar
server.get('/competencias/:id/peliculas', controladorPeliculas.getObtenerPeliculas);
//Ruta para votar
server.post('/competencias/:id/voto', controladorVotos.postObtenerVotos);
//Ruta para obtener las 3 películas más votadas
server.get('/competencias/:id/resultados', controladorResultados.getResultados);
//Ruta para crear una nueva competencia
server.post('/competencias', controladorNuevaCompetencia.postNuevaCompetencia);
// Ruta para eliminar votos
server.delete('/competencias/:id/votos',controladorEliminarVotos.deleteVotos);
// Ruta para cargar nuevas competencias a través del genero correspondiente
server.get('/generos', controladorGeneros.getAllGeneros);
// Ruta para cargar nuevas competencias a través del director correspondiente
server.get('/directores', controladorDirectores.getAllDirectores);
// Ruta para cargar nuevas competencias a través de los actores correspondientes
server.get('/actores', controladorActores.getAllActores);
// Eliminar películas
server.delete('/competencias/:id', controladorEliminarCompetencias.deleteCompetencias);
server.put('/competencias/:id', controladorEditarCompetencias.putEditarCompetencia);



//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
