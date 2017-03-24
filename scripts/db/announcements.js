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


function addAnnouncement(subdomain, ownerid, title, body) {

    let timestamp = new Date()
    timestamp = timestamp.toISOString()
    let annid = checksum(body + timestamp)
    return new Promise((resolve, reject)=>{
    getId(subdomain).then((hackathonid)=>{
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
    }).catch((e)=>{
        console.log(e)
    })

        


        // let queryString = `insert into hackathon_announcements (hackathonid, annid, ownerid, title, body, timestamp)
        // values (1, '${annid}', ${ownerid}, '${title}', '${body}', '${timestamp}')`
        // let queryString =`insert into hackathon_announcements (hackathonid, annid, ownerid, title, body, timestamp)
        // values (1, 'test5', 1, 'test5', 'from postgresql', '2011-05-16 15:36:38')`
        // return new Promise((resolve, reject)=>{
        //     sql.insert(queryString)
        //     .then((res)=>{
        //         resolve()
        //     }).catch((e)=>{
        //         return reject(e)
        //     })
        // })

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


module.exports = {
    getAnnouncements: getAnnouncements,
    addAnnouncement: addAnnouncement
}
