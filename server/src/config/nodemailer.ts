import nodemailer from 'nodemailer';
import convert from '../util/convertHtmltoHB';
export const sendConfirmationEmail = async (receiver: string, url: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USER, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });

    const converted = await convert('src/assets/confirmationTemplate.html', { link: url });
    return transporter.sendMail({
      to: receiver,
      subject: 'Confirm Email',
      html: converted,
    });
  } catch (error) {
    console.log(error);
  }
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
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter.sendMail({
    to: receiver,
    subject: 'Target Price Hit!',
    html: `Your target price of ₱${target} was hit! ${itemName} is now currently ₱${price} `,
  });
};

export const sendPasswordReset = (receiver: string, url: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  return transporter.sendMail({
    to: receiver,
    subject: 'Password change request',
    html: url,
  });
};
