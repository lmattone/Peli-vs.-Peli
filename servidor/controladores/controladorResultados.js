const connection = require('../dataBase/connection');

module.exports = {

    getResultados: (req, res) => {
        if (!req.params.id || isNaN(req.params.id)) return res.status(400).send('Competencia inválida');
       
        let idCompetencia = parseInt(req.params.id);

        connection.query(
            ' SELECT nombre FROM competencias WHERE id = ? ',
            [idCompetencia],
            (error, competencias, fields) => {
                if (error) return console.error(error);
                if (competencias.length == 0) return res.status(404).send('La competencia no existe');

                let sql = ' SELECT v.pelicula_id, p.poster, p.titulo, SUM(1) as votos ' +
                    ' FROM votos v ' +
                    ' LEFT JOIN pelicula p ON p.id = v.pelicula_id ' +
                    ' WHERE competencias_id = ? ' +
                    ' GROUP BY v.pelicula_id ' +
                    ' ORDER BY SUM(1) DESC ' +
                    ' LIMIT 3 ';
                    connection.query(sql,
                        [idCompetencia],
                        (error, results, fields) => {
                            if (error) return console.error(error);
                                res.status(200).json({ 
                                    competencia: competencias[0].nombre,
                                    resultados: results 
                             }
                        );
                    }
                );
            }
        )
       
    }
}

