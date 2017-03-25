const sql = require('./query')
const crypto = require('crypto')
const unescape = require('unescape')


function add(hackathonid, title, icon, html, order) {
    return new Promise((resolve, reject)=>{
        let queryString = `insert into hackathon_pages (hackathonid, title, icon, html, arrangement)
        values (${hackathonid}, '${title}', '${icon}', '${html}', ${order})`
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

function getAll(hackathonid) {
     let queryString = `select title, icon, pageid from hackathon_pages
    where hackathonid=${hackathonid}
    order by arrangement ASC`
    return new Promise((resolve, reject)=>{
        sql.select(queryString)
        .then((res)=>{
            resolve(res)
        }).catch((e)=>{
            return reject(e)
        })
    })
}

function getPage(pageid){
let queryString = `select title, html from hackathon_pages
    where pageid=${pageid}`
    return new Promise((resolve, reject)=>{
        sql.select(queryString)
        .then((res)=>{
            resolve( unescape(res[0].html) )
        }).catch((e)=>{
            return reject(e)
        })
    })
}

module.exports = {
    getAll: getAll,
    add: add,
    getPage: getPage
}