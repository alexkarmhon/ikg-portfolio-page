import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_USER,
      pass: process.env.APP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: email,
    // to: '89o.kh89@gmail.com',//work
    to: 'iralwaysart@gmail.com', //prod
    subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}
