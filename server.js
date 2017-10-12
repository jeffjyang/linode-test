const express = require('express');
const app = express();

var port = 8080;


const pg = require('pg');

const config = {
    host: 'moonwalk-1.postgres.database.azure.com',
    // Do not hard code your username and password.
    // Consider using Node environment variables.
    user: process.env.USER,
    password: process.env.PASS,
    database: 'postgres',
    port: 5432,
    ssl: true
};

const client = new pg.Client(config);

client.connect(err => {
    if (err) throw err;
    //else { queryDatabase(); }
});

app.listen(port, function(){
  console.log("Express app listening on port " + port);
});

app.get('/test', function(request, response){
  //var send = queryDatabase(function);
  var send = queryDatabase(response,returnFunc);
  //response.end("Hello world! \n" + send);
});



function queryDatabase(response,callback){
  console.log(`Running query to PostgreSQL server: ${config.host}`);

  var returnString = "hello! ";

  const query = 'SELECT * FROM inventory;';

  client.query(query)
      .then(res => {
          const rows = res.rows;

          rows.map(row => {
              returnString += JSON.stringify(row); // TODO
              console.log(returnString);
              //console.log(`Read: ${JSON.stringify(row)}`);
          });

          callback(response,returnString);
          process.exit();

      })
      .catch(err => {
          console.log(err);
      });

}

function returnFunc(response,string){
  console.log("callback execute");
  response.end(string);

}
