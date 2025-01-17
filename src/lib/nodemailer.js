const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user:"santoshallu1234@gmail.com",
      pass: "spufdfwtjmtkhoqr",
  },
});

module.exports = transporter;
