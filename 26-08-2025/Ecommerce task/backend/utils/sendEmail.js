import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

async function sendEmail(to,subject,text,html) {
  const transporter = nodemailer.createTransport({
    // host: "live.smtp.mailtrap.io",
    // port: 587,
    // secure: false,
    // auth: {
    //   user: process.env.MAILTRAP_USER,
    //   pass: process.env.MAILTRAP_API_KEY,
    // },
    service:'gmail',
    auth:{
      user:process.env.GMAIL_USER,
      pass:process.env.GMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: to,
    subject: subject,
    text: text,
    html: html //change the ${token} link with actual frontend link
  };

await  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("ERROR", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


export default sendEmail