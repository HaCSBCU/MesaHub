const sql = require('./query')
const crypto = require('crypto')

function checksum (str) {
    return crypto
        .createHash('sha1')
        .update(str, 'utf8')
        .digest('hex')
}

function addEvent(ownerid, hackathonid, title, location, time, picture) {
    let eventid = checksum(title + time)
    return new Promise((resolve, reject)=>{
        let queryString = `insert into hackathon_events (hackathonid, eventid, ownerid, title, location, time, icon)
        values (${hackathonid}, '${eventid}', ${ownerid}, '${title}', '${location}', '${time}', '${picture}')`
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

function getEvents(hackathonid) {
     let queryString = `select * from hackathon_events
    where hackathonid=${hackathonid}
    order by time DESC`
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
    addEvent: addEvent,
    getEvents: getEvents
}