const connection = require('../dataBase/connection');

module.exports = {

    deleteVotos: (req, res) => {
       
        var idCompetencia = parseInt(req.params.id);
       
        connection.query(
            ' SELECT * FROM competencias WHERE id = ? ',
            [idCompetencia],
            (error, competencias, fields) => {
                if (error) return console.error(error);
                if (competencias.length == 0) return res.status(404).send('La competencia no existe');

                connection.query(' DELETE FROM votos WHERE competencias_id = ? ',
                    [idCompetencia],
                    (error, peliculas, fields) => {
                        if (error) return console.error(error);
                        res.status(200).send();
                    }
                )
            }
         );
     }
}