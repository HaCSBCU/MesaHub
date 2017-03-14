// Twilio Credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceSid = process.env.TWILIO_SERVICE_SID
const Nexmo = require('nexmo');

var nexmo = new Nexmo({
    apiKey: process.env.NEXMO_API_KEY,
    apiSecret: process.env.NEXMO_API_SECRET,
    applicationId: process.env.NEXMO_APP_ID,
    privateKey: process.env.NEXMO_PRIATE_KEY,
  });


const client = require('twilio')(accountSid, authToken);


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


function nexmoSend(destinationNumber, msg){
  nexmo.message.sendSms(process.end.NEXMO_NUMBER, destinationNumber, msg, (res) => {
    console.log(res)
  })
}




module.exports = {
  send: send,
  sendMany: sendMany
}
