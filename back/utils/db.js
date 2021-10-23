const mysql = require('mysql');
const Promise = require('bluebird');

require('dotenv').config();

let connection = mysql.createPool({
    connectionLimit: process.env.CONNECTION_LIMIT ||10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //這是設定日期顯示年月日就好
    dateStrings:true,
});

connection = Promise.promisifyAll(connection);

module.exports = connection;