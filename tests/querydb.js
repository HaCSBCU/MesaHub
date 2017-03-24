
const sql = require('../scripts/db/query')


sql.select("select name from hackathon where subdomain='brumhack'")
  .then((res)=>{
    console.log(res)

  }).catch((e)=>{
    console.log(e)
  })


  let queryString =`insert into hackathon_announcements (hackathonid, annid, ownerid, title, body, timestamp)
        values (1, 'test3', 1, 'test', 'from postgresql', '2011-05-16 15:36:38')`
            sql.insert(queryString)
            .then((res)=>{
                console.log(res)
            }).catch((e)=>{
                console.log(e)
            })