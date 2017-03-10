const attendees = require('../db/attendees.js');

var user = {name:'pandelis',surname:'zembashis', university:'birmingham city university', email: 'email', phone: 'phone'}
var manyUserss = [{name:'pandelis',surname:'zembashis', university:'birmingham city university', email: 'email', phone: 'phone'}, {name:'pandelis',surname:'zembashis', university:'birmingham city university', email: 'email', phone: 'phone'}]

var newAtt = attendees.add(user.name, user.surname, user.university, user.email, user.phone)

newAtt.then(()=>{
  console.log('added')
}).catch((err)=>{
  console.log(err)
})


attendees.addMany(manyUserss)
