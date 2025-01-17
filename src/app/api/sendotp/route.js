import transporter from '../../../lib/nodemailer';
// import User from '../../../models/Shopkeeper'; 
import connectMongoDB from '../../../lib/dbConfig'; // Connect to your database
import { NextResponse } from 'next/server';

export async function POST(req) {
  

  const {email} = await req.json();
  console.log("email: ", email)

  await connectMongoDB(); // Connect to MongoDB

  // const user = await User.findOne({ email });
  // if (!user) {
  //   console.log("User does not exist, creating a new one")
  //   return NextResponse.json({ message: 'User does not exist' }, {status: 200});
  // }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  const mailOptions = {
    from: "santoshallu1234@gmail.com",
    to: email,
    subject: 'Your PlayPerk OTP Code',
    text: `Dear user,\n\nYour OTP for PlayPerk is: ${otp}\n\nThank you,\nThe PlayPerk Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    // Save OTP to database or session if needed
    return NextResponse.json({ message: 'OTP sent successfully', otp }, {status: 200});
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ message: 'Failed to send OTP' }, {status: 500});
  }
}
