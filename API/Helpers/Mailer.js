const nodemailer = require("nodemailer");

module.exports = async function(mail){
  try{

    let testAccount = nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, //
      auth: {
        user: "jeandedieuuwizeye6@gmail.com", // 
        pass: "<1379>j@6", // 
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'jeandedieuuwizeye6@gmail.com', // sender address
      to: mail.address, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.text, // plain text body
      html: mail.html, // html body
    });
    return info;

  }catch(err){
      return false
  }
}