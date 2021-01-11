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

export const sendTargetNotif = (
  receiver: string,
  itemName: string,
  price: number,
  target: number
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.GMAIL_PASS, // generated ethereal password
    },
  });

  return transporter.sendMail({
    to: receiver,
    subject: 'Target Price Hit!',
    html: `Your target price of ${target} was hit! ${itemName} is now currently ${price} pesos`,
  });
};
