

async function sendEmail(to,subject,text,html) {
  const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_API_KEY,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "yourusername@demomailtrap.co",
    to: to,
    subject: subject,
    text: text,
    html: html //change the ${token} link with actual frontend link
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("ERROR", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}


export default sendEmail