const csv = require('csv');
const fs = require('fs')
var path = require('path');

fs.readFile(path.join(__dirname, '../attendees.csv'), function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;


    processFile(content);
});

function processFile(attendees) {
  csv.parse(attendees, (err, data)=>{
    csv.transform(data, function(data){
      console.log(data);
    })
  })
}
