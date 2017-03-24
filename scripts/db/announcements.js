const sql = require('../scripts/db/query')
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
                return resolve(res[0].hackathonid)
            }
            return reject('No hackathon with matching subdomain')
        }).catch((e)=>{
            return reject(e)
        })
    })
}


function addAnnouncement(subdomain, ownerid, title, body) {

    let timestamp = new Date().now()
    let annid = checksum(body)

    getId(subdomain)
    .then((hackathonid)=>{
        let queryString = `insert into hackathon_announcements (hackathonid, annid, ownerid, title, body, timestamp)
        values (${hackathonid}, ${annid}, ${ownerid}, ${title}, ${body}, ${timestamp})`
        return new Promise((resolve, reject)=>{
            sql.insert(queryString)
            .then((res)=>{
                resolve()
            })
        })
    })
    .catch((e)=>{
        return reject(e)
    })

}


/**
 * Select all the announcements available for a hackathon
/ * @param {*} hackathonid 
/ * @return [] of results
/ */
function getAnnouncements(hackathonid){

    let queryString = `select * from hackathon_announcements
    where hakcathonid=${hackathonid}
    order by timestamp DESC`
    return new Promise((resolve, reject)=>{
        sql.select(queryString)
        .then((res)=>{
            resolve(res)
        }).catch((e)=>{
            return reject(e)
        })
    })

}
<<<<<<< HEAD
=======


module.exports = {
    getAnnouncements: getAnnouncements,
    addAnnouncement: addAnnouncement
}
>>>>>>> subdomains#52
