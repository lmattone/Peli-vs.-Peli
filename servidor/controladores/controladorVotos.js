const connection = require('../dataBase/connection');

module.exports = {

    postObtenerVotos: (req, res) => {
        var idPelicula = req.body.idPelicula;
        var idCompetencia = parseInt(req.params.id);

        connection.query(
            ' SELECT * FROM competencias WHERE id = ? ',
            [idCompetencia],
            (error, competencias, fields) => {
                if (error) return console.error(error);
                if (competencias.length == 0) return res.status(404).send('La competencia no existe');

                connection.query(' SELECT * FROM pelicula WHERE id = ? ',
                    [idPelicula],
                    (error, peliculas, fields) => {
                    if(error) return console.error(error);
                    if(peliculas.length == 0 ) return res.status(404).send('La pelicula no existe');

                    connection.query(' INSERT INTO votos (competencias_id, pelicula_id) values (?,?) ',
                        [idCompetencia, idPelicula],
                        (error, results, fields) => {
                        if(error) return console.error(error);
                        
                            res.status(200).json({message:'pelicula votada'});
                            }
                        );
                    }
                );
            }
        );
    }
}
