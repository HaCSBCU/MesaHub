// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceSid = process.env.TWILIO_SERVICE_SID

const client = require('twilio')

if (accountSid && authToken) {
  client(accountSid, authToken)
}


function send(destinationNumber, msg){
  client.sendMessage({
    from: '+441727263039',
    messagingServiceSid: serviceSid,
    to: destinationNumber,
    body: msg
  }, function(err, data) {
    if (err) {
      console.error('Could not notify user ' + destinationNumber);
      console.error(err);
    } else {
      console.log('User notified');
    }
  })
}


function sendMany(arrOfNumbers, msg){
  arrOfNumbers.map( (x)=>send(x, msg) )
}



module.exports = {
  send: send,
  sendMany: sendMany
}
