import nodemailer from 'nodemailer';

export const sendConfirmationEmail = (receiver: string, url: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });
  return transporter.sendMail({
    to: receiver,
    subject: 'Confirm Email',
    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
  });
};
