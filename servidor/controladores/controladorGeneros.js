const connection = require('../dataBase/connection');

module.exports = {

    getAllGeneros: (req, res) => {
        connection.query(
            ' SELECT * FROM genero ',
            (error,results, fields) => {
            if (error) return console.error(error);
                res.json(results);
            }
        )
    }
}
