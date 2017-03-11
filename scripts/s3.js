// Load the SDK for JavaScript
const AWS = require('aws-sdk')
const crypto = require('crypto')
const fileType = require('file-type')



// Create S3 service object
var s3 = new AWS.S3( { params: {Bucket: 'bullhacks'} })

function checksum (str) {
    return crypto
        .createHash('sha1')
        .update(str, 'utf8')
        .digest('hex')
}

module.exports = {
  //@Param file: Buffer
  upload: function(file) {
    let ext = fileType(file)
    let data = {Key: checksum(file) + '.' + ext.ext, Body: file, ContentType: ext.mime, ACL: 'public-read'}
    console.log(data)
    return new Promise((resolve, reject) => {
      s3.putObject(data, (err, result) => {
        if (err) return reject(err)
        resolve('https://hackupc.s3.amazonaws.com/' + data.Key)
      })
    })
  }
}
