const sql = require("mssql");
const config = require("./dbConfig");
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to sql server');
        return pool
    })
    .catch(err => console.log(err));
module.exports = {
    poolPromise,
    sql
};