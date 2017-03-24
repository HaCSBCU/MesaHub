const pg = require('pg')
//env var: PGUSER
//env var: PGDATABASE
//env var: PGPASSWORD
//env var: PGPORT
let config = {
  host: process.env.PG_HOST, // Server hosting the postgres database
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}


const pool = new pg.Client(config)



pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

module.exports.pool = pool;