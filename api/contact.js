import nodemailer from 'nodemailer';
import cors from 'cors';

const corsMiddleware = cors({
  origin: ['http://localhost:5173', 'https://ikg-portfolio-page.vercel.app'],
});

export default async function handler(req, res) {
  corsMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      const { name, mail, subject, message } = req.body;

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
        from: mail,
        to: '89o.kh89@gmail.com',
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Feedback send!' });
      } catch (error) {
        res.status(500).json({ message: 'Error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  });
}
