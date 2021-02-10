import nodemailer from 'nodemailer';
import convert from '../util/convertHtmltoHB';
import dotenv from 'dotenv';
dotenv.config();
const mailOptions = {
  host: 'smtp.zoho.com',
  service: 'Zoho',
  port: 465,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
export const sendConfirmationEmail = async (receiver: string, url: string) => {
  const transporter = nodemailer.createTransport(mailOptions);

  const converted = await convert('assets/confirmationTemplate.html', { link: url });
  return transporter.sendMail({
    to: receiver,
    from: `noreply<${process.env.MAIL_USER}>`,
    subject: 'Confirm Email',
    html: converted,
  });
};

export const sendTargetNotif = (
  receiver: string,
  itemName: string,
  price: number,
  target: number
) => {
  const transporter = nodemailer.createTransport(mailOptions);

  return transporter.sendMail({
    to: receiver,
    from: `noreply<${process.env.MAIL_USER}>`,
    subject: 'Target Price Hit!',
    html: `Your target price of ₱${target} was hit! ${itemName} is now currently ₱${price} `,
  });
};

export const sendPasswordReset = async (receiver: string, url: string) => {
  const transporter = nodemailer.createTransport(mailOptions);
  const converted = await convert('assets/passwordChangeTemplate.html', { link: url });
  const res = await transporter.sendMail({
    to: receiver,
    from: `noreply<${process.env.MAIL_USER}>`,
    subject: 'Password change request',
    html: converted,
  });
  return res;
};
