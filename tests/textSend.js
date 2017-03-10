const text = require('../scripts/texting')
var date = new Date();
var current_hour = date.getHours() + ':' + date.getMinutes();

let numbers = ['7927475341', '07443331230', '07928236077' ]

text.send('7927475341', 'Hello me' + Date.now())

text.sendMany(numbers, 'MAUHAHAHHAH' + current_hour)
