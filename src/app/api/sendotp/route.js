import transporter from '../../lib/nodemailer';
import User from '../../models/User'; // Assuming you have a User model
import connectDb from '../../lib/mongoose'; // Connect to your database

export default async function sendOtp(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  await connectDb(); // Connect to MongoDB

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  const mailOptions = {
    from: process.env.EMAIL_SERVICE_USER,
    to: email,
    subject: 'Your CoderHabit OTP Code',
    text: `Dear user,\n\nYour OTP for CoderHabit is: ${otp}\n\nThank you,\nThe CoderHabit Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Save OTP to database or session if needed
    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
}
