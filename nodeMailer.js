const nodeMailer = require("nodemailer");

require("dotenv").config();

const transporter = nodeMailer.createTransport(
  {
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "klimov.dmitrij.02@mail.ru",
      pass: process.env.PASS_MAil,
    },
  },
  {
    from: "Копия ВК. Сообщение от <klimov.dmitrij.02@mail.ru>",
  }
);

const mailer = (message) => {
  transporter.sendMail(message, (err, info) => {
    if (err) return console.error(err);
  });
};

module.exports = mailer;
