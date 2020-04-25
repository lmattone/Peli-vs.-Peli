const connection = require('../dataBase/connection');

module.exports = {

    postNuevaCompetencia: (req, res) => {

        let nombreCompetencia = req.body.nombre;
        let generoCompetencia = req.body.genero === '0' ? null : req.body.genero;
        let directorCompetencia = req.body.director === '0' ? null : req.body.director;
        let actorCompetencia = req.body.actor === '0' ? null : req.body.actor;

        // Chequea la obligatoriedad del nombre de una competencia
        if (!nombreCompetencia)return res.status(400).send('Nombre es un campo obligatorio');

        //Chequea que el nombre de la competencia no sea igual a  otra ya existente
        let sqlnombreCompetencia = "SELECT * FROM competencias WHERE nombre = '" + nombreCompetencia + "'";

        connection.query(sqlnombreCompetencia, function(error, results, fields) {
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }

        if (results.length === 1) {
            console.log("Ya hay una competencia con este nombre");
            return res.status(422).send("Ya hay una competencia con este nombre");
        }

        let sql = 'SELECT COUNT(1) cantidad_peliculas FROM pelicula as P ';
        let sqlParams = [];

        
        // Si elige una crear una competencia por por director, actor, genero o combinada
        if (generoCompetencia && directorCompetencia && actorCompetencia) {
            sql +=  ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id ' +
                    ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id ' +
                    ' WHERE Dp.director_id = ? AND Ap.actor_id = ? AND genero_id = ? ';
            sqlParams.push(generoCompetencia, directorCompetencia, actorCompetencia);
        } else if (directorCompetencia && actorCompetencia) {
            sql +=  ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id ' +
                    ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id ' +
                    ' WHERE Dp.director_id = ? AND Ap.actor_id = ? ';
            sqlParams.push(directorCompetencia, actorCompetencia);
        } else if (directorCompetencia && generoCompetencia) {
            sql +=  ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id WHERE Dp.director_id = ? AND genero_id = ? ';
            sqlParams.push(directorCompetencia, generoCompetencia);
        } else if (actorCompetencia && generoCompetencia) {
            sql +=  ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id WHERE Ap.actor_id = ? ' +
                    'AND genero_id = ? ';
            sqlParams.push(actorCompetencia, generoCompetencia);
        } else if (generoCompetencia) {
            sql += ' WHERE genero_id = ? ';
            sqlParams.push(generoCompetencia);
        } else if (directorCompetencia) {
            sql += ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id WHERE Dp.director_id = ? ';
            sqlParams.push(directorCompetencia);
        } else if (actorCompetencia) {
            sql += ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id WHERE Ap.actor_id = ? ';
            sqlParams.push(actorCompetencia);
        }

        console.log(sql);
        console.log(req.body);
        connection.query(sql,
            [sqlParams],
            (error, results, fields) => {
                if (error) return console.error(error);
                if (results[0].cantidad_peliculas < 2) return res.status(400).json('No hay películas suficientes con esa combinación para la competencia');
            

            connection.query('INSERT INTO competencias (nombre, genero_id, director_id, actor_id) VALUES (?, ?, ?, ?) ',
                [nombreCompetencia, generoCompetencia, directorCompetencia, actorCompetencia],
                (error, results, fields) => {
                if (error) return console.error(error);

                res.status(201).json({ message: 'La competencia ha sido creada con éxito' });
                });
            });
        });
    }
}



