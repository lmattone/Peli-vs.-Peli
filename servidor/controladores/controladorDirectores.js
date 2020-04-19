const connection = require('../dataBase/connection');

module.exports = {

    getAllDirectores: (req, res) => {
        connection.query(
            ' SELECT * FROM director ',
            (error, results, fields) => {
                if (error) return console.error(error);
                res.json(results);
            }
        )
    }
}