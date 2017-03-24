const db = require('./config');


function select(queryString){

    return new Promise((resolve,reject) => {
        db.pool.connect(function(err, client, done) {
            if(err) {
                 reject(new Error('error fetching client from pool'))
            }
                client.query(queryString , function(err, result) {
                    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                    //done(err)

                    if(err) {
                        reject(new Error('error running query'))
                    }
                    resolve(result.rows)
                });
        });
    })

}


// select('SELECT * FROM hackathon').then((res)=>{
//     console.log(res)
// })
