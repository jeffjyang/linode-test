const pg = require('pg');

// lol
var http = require('http');



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





http.createServer(queryDatabase()).listen(8080, '173.255.216.97');
console.log('Server running at http://173.255.216.97:8080/');








function queryDatabase() {

    console.log(`Running query to PostgreSQL server: ${config.host}`);

    const query = 'SELECT * FROM inventory;';

    client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                console.log(`Read: ${JSON.stringify(row)}`);
            });

            //process.exit();
        })
        .catch(err => {
            console.log(err);
        });
}
