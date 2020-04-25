const connection = require('../dataBase/connection');

module.exports = {

    getCompetencia: (req, res) => {

        let idCompetencia = parseInt(req.params.id);

        let sql = ' SELECT competencias.nombre, genero.nombre as genero_nombre, actor.nombre as actor_nombre, director.nombre as director_nombre FROM competencias' +
                  ' LEFT JOIN genero ON competencias.genero_id = genero.id ' +
                  ' LEFT JOIN actor  ON competencias.actor_id = actor.id ' +
                  ' LEFT JOIN director ON competencias.director_id = director.id ' +
                  ' WHERE competencias.id = ? ';
       
        connection.query(
            sql,
            [idCompetencia],
            (error, results, fields) => {
                if (error) return console.error(error);
                if (results.length == 0) return res.status(404).send('La competencia no existe');

                res.send(JSON.stringify(results[0]));
            }
        );
    }
}