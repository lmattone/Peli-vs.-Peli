const connection = require('../dataBase/connection');

module.exports = {

    putEditarCompetencia: (req, res) => {

        let idCompetencia = parseInt(req.params.id);
        let nombreCompetencia = req.body.nombre;
       

        connection.query(
            ' SELECT * FROM competencias WHERE id = ? ',
            [idCompetencia],
            (error, competencias, fields) => {
                if (error) return console.error(error);
                if (competencias.length == 0) return res.status(404).send('La competencia no existe');

                
                connection.query(' UPDATE competencias SET nombre = ? WHERE id = ? ',
                    [nombreCompetencia, idCompetencia],
                    (error, results, fields) => {
                        if (error) return console.error(error);
                        res.status(200).send('La competencia ha sido editada');
                    }
                );
            }
        );
    }
}