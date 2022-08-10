const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // name:'example',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'tomaspintokramer@gmail.com',//fake email
      pass: 'gmeulnwtwegpqzci', // generated ethereal password
    },
  })

  transporter.verify()
  .then(()=>console.log('Ready to send emails'))

  

  module.exports=transporter