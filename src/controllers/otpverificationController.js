// server.js
const nodemailer = require('nodemailer');
const User = require("../models/User");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host : 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: "santoshallu1234@gmail.com",
      pass: "spufdfwtjmtkhoqr",
    }
  });
//hello
exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(204).json({ message: "User does not exists" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: 'santoshallu1234@gmail.com',
    to: email,
    subject: 'Your CoderHabit OTP Code',
    text: `Dear user,\n\nYour OTP for CoderHabit is: ${otp}\n\nThank you,\nThe CoderHabit Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    // Store OTP in a database or in-memory storage for verification
    // For simplicity, you can return it in the response (not recommended for production)
    res.status(200).json({ otp });
  });
};

// for extention to create as well
exports.sendOtpExtention = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  const mailOptions = {
    from: 'santoshallu1234@gmail.com',
    to: email,
    subject: 'Your CoderHabit OTP Code',
    text: `Dear user,\n\nYour OTP for CoderHabit is: ${otp}\n\nThank you,\nThe CoderHabit Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
    // Store OTP in a database or in-memory storage for verification
    // For simplicity, you can return it in the response (not recommended for production)
    res.status(200).json({ otp });
  });
};


exports.sendFeedback = async (req, res) => {
  const { name,
    email,
    feedback,
    rating,  } = req.body;

  const mailOptions = {
    from: email,
    to: 'xroot.info@gmail.com',
    subject: 'Feedback Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}\nRating: ${rating}`,
  };
  res.status(200).json({ feedback });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
  });
}
exports.sendFeedbackhome = async (req, res) => {
  const { 
    feedback } = req.body;

  const mailOptions = {
    from: 'CoderHabit User',
    to: 'xroot.info@gmail.com',
    subject: 'Feedback Form Submission',
    text: `Feedback: ${feedback}`,
  };
  res.status(200).json({ feedback });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email');
    }
  });
}
