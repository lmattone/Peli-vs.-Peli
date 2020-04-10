const express = require('express');
const server = express();





//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = 3333;
server.listen(puerto, function (){
    console.log('Escuchando peticiones en el puerto ' + puerto);
});
