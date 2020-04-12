const connection = require('../dataBase/connection');

module.exports = {

    getAllCompetencias:(req,res)=>{
        connection.query('SELECT * FROM competencias',
        (error, competencias, fields) => {
        res.json(competencias);
        }
    );
}
}



