const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'bnwtq8uspsvqatrojuoj-mysql.services.clever-cloud.com',
  user: 'u7tbkxfrjxowuils',
  password: 'Y90awItExIiI672EFFBF',
  database: 'bnwtq8uspsvqatrojuoj',
  multipleStatements: true


});
mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('base de datos conectada!');
  }
});

module.exports = mysqlConnection;