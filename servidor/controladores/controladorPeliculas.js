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
                let sqlPeliculas = ' SELECT P.id, P.poster, P.titulo FROM pelicula as P ';
                let sqlParams = [];

                // Si elige una competencia por director, actor y genero
                if (competencia.director_id && competencia.actor_id && competencia.genero_id){
                    sqlPeliculas += ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id '+
                                    ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id '
                                    ' WHERE Dp.director_id = ? AND  Ap.actor_id = ? AND genero_id = ? ';
                    sqlParams.push(competencia.director_id, competencia.actor_id, competencia.genero_id);
                }else if (competencia.director_id && competencia.actor_id) {
                    sqlPeliculas += ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id ' +
                                    ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id '
                                     ' WHERE Dp.director_id = ? AND  Ap.actor_id = ? ';
                    sqlParams.push(competencia.director_id, competencia.actor_id);
                }else if (competencia.director_id && competencia.genero_id) {
                    sqlPeliculas += ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id WHERE Dp.director_id = ? ' +
                                    ' AND genero_id = ? ';
                    sqlParams.push(competencia.director_id, competencia.genero_id);
                }else if (competencia.actor_id && competencia.genero_id) {
                    sqlPeliculas +=  ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id WHERE Ap.actor_id = ? ' +
                                     ' AND genero_id = ? ';
                    sqlParams.push(competencia.actor_id, competencia.genero_id);
                }else if (competencia.genero_id) {
                    sqlPeliculas += ' WHERE genero_id = ? ';
                    sqlParams.push(competencia.genero_id);
                }else if (competencia.director_id) {
                    sqlPeliculas += ' LEFT JOIN director_pelicula as Dp ON P.id = Dp.pelicula_id WHERE Dp.director_id = ? ';
                    sqlParams.push(competencia.director_id);
                }else if (competencia.actor_id) {
                    sqlPeliculas += ' LEFT JOIN actor_pelicula as Ap ON P.id = Ap.pelicula_id WHERE Ap.actor_id = ? ';
                    sqlParams.push(competencia.actor_id);
                }
            

                sqlPeliculas += ' ORDER BY RAND() LIMIT 2 ';

                console.log(sqlPeliculas);
                console.log(sqlParams);

                connection.query(
                    sqlPeliculas,
                    sqlParams,
                    (error, results, fields) => {
                        if (error) return console.error(error);
                        res.json({
                            id: competencia.nombre, 
                            peliculas: results
                        });
                    }
                );
            }
        );
    }
}
