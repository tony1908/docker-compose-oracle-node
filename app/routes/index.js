var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

var oracledb = require('oracledb');

// Get a non-pooled connection
oracledb.getConnection(
  {
    user          : "system",
    password      : "oracle",
    connectString : " oracle-db-cont"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      // The statement to execute
      `SELECT department_id, department_name
       FROM departments
       WHERE department_id = :id`,

      // The "bind value" 180 for the bind variable ":id"
      [180],

      // execute() options argument.  Since the query only returns one
      // row, we can optimize memory usage by reducing the default
      // maxRows value.  For the complete list of other options see
      // the documentation.
      { maxRows: 1
        //, outFormat: oracledb.OBJECT  // query result format
        //, extendedMetaData: true      // get extra metadata
        //, fetchArraySize: 100         // internal buffer allocation size for tuning
      },

      // The callback function handles the SQL execution results
      function(err, result) {
        console.log("CONEXION A ORACLE")
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.metaData); // [ { name: 'DEPARTMENT_ID' }, { name: 'DEPARTMENT_NAME' } ]
        console.log(result.rows);     // [ [ 180, 'Construction' ] ]
        doRelease(connection);
      });
  });

// Note: connections should always be released when not needed
function doRelease(connection) {
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}
  res.render('index', { title: 'Express' });
});

module.exports = router;
