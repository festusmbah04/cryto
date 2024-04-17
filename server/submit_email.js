// server/submit_email.js

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  const emailText = JSON.parse(event.body).textarea;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'festusmbahconnect@gmail.com',
      pass: 'ulchsarqvbpftgwz'
    }
  });

  const mailOptions = {
    from: 'festusmbahconnect@gmail.com',
    to: 'festusmbahconnect@gmail.com',
    subject: 'New form submission',
    text: emailText
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email' })
    };
  }
};
