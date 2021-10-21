var events = require('events');
var eventEmitter = new events.EventEmitter();
const mail = require("./Mailer");

//Create an event handler:
var sendEmail = function (voters) {
  voters.map(voter =>{
    const defaultpwd = `${Math.floor(Math.random()*100)}Pwd${Math.floor(Math.random()*100)}`
    return mail({
        address : voter.Email,
        subject : "Registerd as a student and a voter",
        html : `<b>succesfully registerd as a student and a voter at <i>IPRC Kicukiro<i></b><b>please use this password as you login${voter.password}</b>`
      }) 
  })
}

//Assign the event handler to an event:
eventEmitter.on('sendEmail', sendEmail);

//Fire the 'scream' event:

module.exports = eventEmitter;