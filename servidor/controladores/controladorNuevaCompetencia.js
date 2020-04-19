const connection = require('../dataBase/connection');

module.exports = {

    postNuevaCompetencia: (req, res) => {

        let nombre = req.body.nombre;
    

        connection.query(
            'INSERT INTO competencias (nombre) VALUES (?)',
            [nombre],
            (error, results, fields) => {
                if (error) return console.error(error);

                res.status(201).json({ message: 'La competencia ha sido creada con éxito' });
            }
        );
    },
}


