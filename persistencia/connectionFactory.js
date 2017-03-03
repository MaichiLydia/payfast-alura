var mysql = require('mysql');

function createDBConnection(){
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '2017Gerdau!',
        database: 'payfast'
    });
}

module.exports = function(){
    return createDBConnection;
}