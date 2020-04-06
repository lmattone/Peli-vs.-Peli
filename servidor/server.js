const express = require('express');
const server = express();
const puerto = 3000;







server.listen(puerto, function (){
    console.log('Conectado con el puerto ' + puerto);
});
