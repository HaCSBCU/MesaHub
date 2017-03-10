const csv = require('csv');
const fs = require('fs')
var path = require('path');

function processFile(attendees) {
  return new Promise(function(resolve, reject) {
    csv.parse(attendees, (err, data)=>{
      if(err) {
        reject(err)
      }
      resolve(data)
    })
  });

}

module.exports = {
  processFile: processFile
}
