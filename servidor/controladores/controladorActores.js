const connection = require('../dataBase/connection');

module.exports = {

    getAllActores: (req, res) => {
        connection.query(
            ' SELECT * FROM actor ',
            (error, results, fields) => {
                if (error) return console.error(error);
                res.json(results);
            }
        )
    }
}