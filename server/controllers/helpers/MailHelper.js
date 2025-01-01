import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, // true for port 465, false for other ports
  auth: {
    user: "saifrajamarch647@gmail.com",
    pass: "zwzwpvsprlkxolxx",
  },
});

export const sendMail =async(to,sub,msg)=> {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "saifrajamarch647@gmail.com", // sender address
    to: to, // list of receivers
    subject: sub, // Subject line
    text: msg, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}


