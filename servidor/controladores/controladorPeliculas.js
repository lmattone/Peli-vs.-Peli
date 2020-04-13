const connection = require('../dataBase/connection');

module.exports = {

    getObtenerPeliculas: (req, res) => {

        let CompetenciaId = parseInt(req.params.id);

        connection.query(' SELECT * FROM competencias WHERE id = ? ',
            [CompetenciaId],
            (error, competencias, fields) => {
                if(error) return console.error(error);
                if (!competencias.length) return res.status(404).send('La competencia no existe');

                let competencia = competencias[0]; //Muestra la primer competencia cuyo ID coincida con el seleccionado

                connection.query(' SELECT * FROM pelicula ORDER BY RAND() LIMIT 2 ',
                    (error, results, fields) => {
                        if (error) return console.error(error);
                        res.json({
                            id: competencia,
                            peliculas: results
                        });
                    }
                )
            }
        )
    }
}
