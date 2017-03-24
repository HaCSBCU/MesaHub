
const sql = require('../scripts/db/query')


sql.select("select name from hackathon where subdomain='brumhack'")
  .then((res)=>{
    console.log(res)

  }).catch((e)=>{
    console.log(e)
  })