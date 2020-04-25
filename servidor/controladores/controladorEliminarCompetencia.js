const connection = require('../dataBase/connection');

module.exports = {

    deleteCompetencias: (req, res) => {

        let idCompetencia = parseInt(req.params.id);

        connection.query(
            ' SELECT nombre FROM competencias WHERE id = ? ',
            [idCompetencia],
            (error, competencias, fields) => {
                if (error) return console.error(error);
                if (competencias.affectedRows === 0) return res.status(404).send('La competencia no existe');

                connection.query(
                    ' DELETE FROM votos WHERE competencias_id = ?',
                    [idCompetencia],
                    (error, results, fields) => {
                        if (error) return console.error(error);
                        
                    connection.query(
                        ' DELETE FROM competencias WHERE id = ? ',
                    [idCompetencia],
                    (error, results, fields) => {
                        if (error) return console.error(error);
                        return res.status(200).send();
                            }
                        )
                    }
                )
            }
        );
    }
}
