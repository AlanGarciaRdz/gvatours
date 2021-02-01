const Pool = require('pg').Pool
var pool;

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development"){
    pool = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'password',
        port: 5432,
    })
}

if (process.env.NODE_ENV === "production"){ 
    pool = new Pool({
        user: 'postgres',
        host: 'database-gva.ctdlpwrrgw3t.us-east-2.rds.amazonaws.com', //ohio
        database: 'postgres',
        password: 'abcd1234!',
        port: 5432,
    })
}
//psql -U postgres -h database-gva.ctdlpwrrgw3t.us-east-2.rds.amazonaws.com -p 5432 postgres

exports.pool =  pool;