import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use([
  cors({
    origin: ['http://localhost:5173', 'https://ikg-portfolio-page.vercel.app'],
  }),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
]);

app.get('/', (req, res) => {
  res.send('Server is working. You are at the root!');
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.VITE_APP_USER,
      pass: process.env.VITE_APP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: email,
    to: '89o.kh89@gmail.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Feedback sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Error' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
