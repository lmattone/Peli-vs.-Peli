const connection = require('../dataBase/connection');

module.exports = {

    postNuevaCompetencia: (req, res) => {

        let nombreCompetencia = req.body.nombre;
        let generoCompetencia = req.body.genero === '0' ? null : req.body.genero;
        let directorCompetencia = req.body.director === '0' ? null : req.body.director;
        let actorCompetencia = req.body.actor === '0' ? null : req.body.actor;

        console.log(req.body);

    

        connection.query('INSERT INTO competencias (nombre, genero_id, director_id, actor_id) VALUES (?, ?, ?, ?) ',
            [nombreCompetencia, generoCompetencia, directorCompetencia, actorCompetencia],
            (error, results, fields) => {
                if (error) return console.error(error);

                res.status(201).json({ message: 'La competencia ha sido creada con éxito' });
            }
        );
    },
}


