// const db = require('./config');
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


const pool = new pg.Pool(config)



pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
})

function select(queryString){

    return new Promise((resolve,reject) => {

        pool.connect(function(err, client, done) {
            if(err) {
                 return reject(new Error('error fetching client from pool'))
            }
                client.query(queryString , function(err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    done(err)

                    if(err) {
                        return reject(new Error('error running query'))
                    }
                    resolve(result.rows)
                });
        });
    })

}

function insert(queryString) {

    return new Promise((resolve,reject) => {

        pool.connect(function(err, client, done) {
            if(err) {
                 return reject(new Error('error fetching client from pool'))
            }
                client.query(queryString , function(err) {

                    if(err) {
                        return reject(new Error('error running query'))
                    }
                    resolve('Added reccord')
                });
        });
    })
}


module.exports = {
    select: select,
    insert: insert
}



// let queryString = `select * 
//   from hackathon_config 
//   inner join hackathon on hackathon.hackathonid=hackathon_config.hackathonid
//   where hackathon.subdomain='${req.subdomains[0]}'`

//   res.locals.hackathon = {name: 'Not a valid Hackathon'}
//   sql.select(queryString)
//   .then((query)=>{
//     if(query.name !== []){
//       console.log(query)
//        res.locals.hackathon = query[0]
//     }
//     next()
//   }).catch((e)=>{
//     console.log(e)
//     res.locals.hackathon.name = 'Name missconfigured'
//     next()
//   })


// select('SELECT * FROM hackathon').then((res)=>{
//     console.log(res)
// })
