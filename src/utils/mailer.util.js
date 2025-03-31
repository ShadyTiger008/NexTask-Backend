import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: "chatterjeesoumyajeet@gmail.com",
    to,
    subject,
    text
  });
};

export default sendEmail;
