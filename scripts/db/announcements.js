const sql = require('./query')
const crypto = require('crypto')

function checksum (str) {
    return crypto
        .createHash('sha1')
        .update(str, 'utf8')
        .digest('hex')
}

function getId(subdomain) {
    return new Promise((resolve, reject)=>{
        sql.select(`select hackathonid from hackathon where subdomain='${subdomain}'`)
        .then((res)=>{
            if (res[0] !== []){
                resolve(res[0].hackathonid)
            }else{
                return reject('No hackathon with matching subdomain')
            }
            
        }).catch((e)=>{
            return reject(e)
        })
    })
}


function addAnnouncement(hackathonid, ownerid, title, body) {

    let timestamp = new Date()
    timestamp = timestamp.toISOString()
    let annid = checksum(body + timestamp)
    return new Promise((resolve, reject)=>{
        let queryString = `insert into hackathon_announcements (hackathonid, annid, ownerid, title, body, timestamp)
        values (${hackathonid}, '${annid}', ${ownerid}, '${title}', '${body}', '${timestamp}')`
            sql.insert(queryString)
            .then((res)=>{
                console.log(res)
                resolve()
            }).catch((e)=>{
                console.log(e)
                reject(e)
            })
    })

}


/**
 * Select all the announcements available for a hackathon
/ * @param {*} hackathonid 
/ * @return [] of results
/ */
function getAnnouncements(hackathonid){

    let queryString = `select * from hackathon_announcements
    where hackathonid=${hackathonid}
    order by timestamp ASC`
    return new Promise((resolve, reject)=>{
        sql.select(queryString)
        .then((res)=>{
            resolve(res)
        }).catch((e)=>{
            return reject(e)
        })
    })

}


module.exports = {
    getAnnouncements: getAnnouncements,
    addAnnouncement: addAnnouncement
}
